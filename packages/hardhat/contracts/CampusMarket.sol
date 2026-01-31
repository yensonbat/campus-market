// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract CampusMarket {
    struct Item {
        uint256 id;
        address payable seller;
        uint256 price;
        string title;
        string description;
        string category;
        bool isSold;
    }

    uint256 public itemCount;
    mapping(uint256 => Item) public items;

    // Eventos para actualizar la UI en tiempo real
    event ItemCreated(uint256 id, address seller, uint256 price);
    event ItemSold(uint256 id, address buyer);

    function listItem(
        uint256 _price, 
        string memory _title, 
        string memory _description, 
        string memory _category
    ) public {
        itemCount++;
        items[itemCount] = Item(
            itemCount, 
            payable(msg.sender), 
            _price, 
            _title, 
            _description, 
            _category, 
            false
        );
        emit ItemCreated(itemCount, msg.sender, _price);
    }

    function buyItem(uint256 _id) public payable {
        Item storage item = items[_id];
        require(msg.value >= item.price, "Saldo enviado insuficiente");
        require(!item.isSold, "El producto ya fue vendido");
        require(msg.sender != item.seller, "No puedes comprar tu propio producto");

        item.isSold = true;
        item.seller.transfer(msg.value); // El pago se transfiere al instante al vendedor
        emit ItemSold(_id, msg.sender);
    }
}