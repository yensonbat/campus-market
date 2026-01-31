"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", price: "", cat: "Libros" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const chainId = 31337;
  const allContractsData = deployedContracts as any;
  const marketConfig = allContractsData[chainId]?.CampusMarket;

  const { data: itemCount, refetch } = useReadContract({
    address: marketConfig?.address,
    abi: marketConfig?.abi,
    functionName: "itemCount",
  });

  const { writeContractAsync } = useWriteContract();

  const handlePublish = async () => {
    if (!form.title || !form.price) return alert("Por favor, llena los campos");
    try {
      await writeContractAsync({
        address: marketConfig?.address,
        abi: marketConfig?.abi,
        functionName: "listItem",
        args: [parseEther(form.price), form.title, form.desc, form.cat],
      });
      // Recargar la lista después de un momento para ver el nuevo producto
      setTimeout(() => refetch?.(), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  if (!mounted || !marketConfig) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="font-bold text-gray-500 animate-pulse">Cargando Campus Market...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">CAMPUS MARKET</h1>
            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Portal de Ventas</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
              BLOCKCHAIN ACTIVA
            </span>
          </div>
        </header>

        {/* Formulario de Publicación */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border mb-10">
          <h2 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">Publicar nuevo producto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input input-bordered w-full bg-gray-50"
              placeholder="¿Qué vendes?"
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="input input-bordered w-full bg-gray-50"
              type="number"
              placeholder="Precio en ETH"
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <textarea
              className="textarea textarea-bordered w-full bg-gray-50 md:col-span-2"
              placeholder="Descripción del estado del producto..."
              onChange={e => setForm({ ...form, desc: e.target.value })}
            />
            <select
              className="select select-bordered w-full bg-gray-50 font-bold"
              onChange={e => setForm({ ...form, cat: e.target.value })}
            >
              <option value="Libros">Libros / Guías</option>
              <option value="Equipos">Equipos / Electrónica</option>
              <option value="Otros">Otros</option>
            </select>
            <button className="btn btn-primary w-full text-white font-bold" onClick={handlePublish}>
              Subir a la Red
            </button>
          </div>
        </div>

        {/* Galería de Productos con la lógica de "Vendido" */}
        <h2 className="text-xl font-bold mb-6 px-2">Marketplace en Vivo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: Number(itemCount || 0) }).map((_, i) => (
            <ProductCard key={i} id={BigInt(i + 1)} config={marketConfig} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Tarjeta con la Condición de Botón/Vendido
const ProductCard = ({ id, config }: any) => {
  const { data: item, refetch }: any = useReadContract({
    address: config.address,
    abi: config.abi,
    functionName: "items",
    args: [id],
  });

  const { writeContractAsync } = useWriteContract();

  // Evitar renderizar si el item está vacío
  if (!item || item[1] === "0x0000000000000000000000000000000000000000") return null;

  // Variables para facilitar la lectura
  const price = item[2];
  const title = item[3];
  const desc = item[4];
  const cat = item[5];
  const isSold = item[6]; // Este es el booleano que define el estado

  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${isSold ? "bg-gray-50 opacity-80" : "bg-white shadow-sm hover:shadow-md"}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-lg uppercase tracking-tighter">
          {cat}
        </span>
        {isSold && (
          <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-1 rounded-lg uppercase">Agotado</span>
        )}
      </div>

      <h3 className={`text-xl font-bold mb-1 ${isSold ? "text-gray-400" : "text-gray-800"}`}>{title}</h3>
      <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">{desc}</p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Precio</span>
          <span className="text-2xl font-black text-gray-900">{formatEther(price)} ETH</span>
        </div>

        {/* Lógica de Condición: Si está vendido, no hay botón */}
        {isSold ? (
          <div className="flex items-center gap-1 text-red-500 font-bold text-sm italic">Vendido correctamente</div>
        ) : (
          <button
            className="btn btn-success btn-sm text-white px-6 rounded-lg"
            onClick={async () => {
              try {
                await writeContractAsync({
                  address: config.address,
                  abi: config.abi,
                  functionName: "buyItem",
                  args: [id],
                  value: price,
                });
                refetch(); // Actualizar la tarjeta tras la compra
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
