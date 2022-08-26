pragma solidity ^0.8;

contract WhiteList
{
    uint8 public maxWhitelistedAddresses;
    uint8 public numAddressesWhitelisted;
    mapping(address=>bool) public whitelistedAddresses;

    constructor(uint8 _maxWhitelistedAddresses)
    {
        maxWhitelistedAddresses=_maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public 
    {
        //Check if already registered or not
        require(!whitelistedAddresses[msg.sender],"You are already Registred !");
        //Check if the numAddressesWhitelisted < maxWhitelistedAddresses
        require(numAddressesWhitelisted<maxWhitelistedAddresses,"Sorry, Registration Closed");
        // Add the address which called the function to the whitelistedAddress array
        whitelistedAddresses[msg.sender]=true;
        // Increase the number of whitelisted addresses
        numAddressesWhitelisted+=1;
    }

}