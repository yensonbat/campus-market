# 🎓 Campus Market - dApp

¡Bienvenido a **Campus Market**! Una plataforma de marketplace universitario descentralizada diseñada para que estudiantes puedan comprar y vender artículos (libros, calculadoras, servicios) de forma segura utilizando la blockchain de Ethereum.

Este proyecto ha sido desarrollado utilizando el stack de **Scaffold-ETH 2**, permitiendo una integración fluida entre Smart Contracts en Solidity y una interfaz moderna en Next.js.

## 🚀 Estado del Proyecto: v1.0 (Producción)
La lógica de negocio reside actualmente en la red de prueba **Sepolia**. 
- **Contrato Desplegado:** `0x9dFcd983ff85e25a5f069fdE75724aFA47E32076`
- **Red:** Ethereum Sepolia Testnet
- **Proveedor RPC:** QuickNode

## ✨ Características
- **Publicación P2P:** Los estudiantes pueden listar productos definiendo título, descripción, categoría y precio en ETH.
- **Seguridad por Contrato:** El Smart Contract garantiza que el dinero solo se transfiera al vendedor tras una compra exitosa.
- **Gestión de Inventario:** Los productos vendidos cambian su estado visual automáticamente y bloquean nuevas compras.
- **Protección de Usuario:** El sistema impide que un vendedor compre sus propios artículos para evitar spam y desperdicio de gas.

## 🛠️ Tecnologías Utilizadas
- **Smart Contracts:** Solidity v0.8.30
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, DaisyUI
- **Blockchain Hooks:** Wagmi & Viem
- **Entorno de Desarrollo:** Hardhat
- **Infraestructura:** QuickNode (RPC) & Etherscan (Verificación)

## 📦 Instalación y Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/yensonbat/campus-market.git](https://github.com/yensonbat/campus-market.git)
   cd campus-market

## 👤 Autor
Yenson Batatima Maestría en Informática - Universidad Politécnica Territorial de Aragua (UPTA) 
Proyecto desarrollado como parte de la investigación en tecnologías descentralizadas y Web3.