import "./Token.sol";
import "./TokenCreationInterface.sol";

contract TokenCreation is TokenCreationInterface, Token {
    function TokenCreation(
        uint _minTokensToCreate,
        uint _closingTime) {

        //closingTime = _closingTime;
        //minTokensToCreate = _minTokensToCreate;
        closingTime = 1563358903;
        minTokensToCreate = 100;
    }

    function createTokenProxy(address _tokenHolder) returns (bool success) {
        if (now < closingTime && msg.value > 0) {

            uint token = msg.value;
            balances[_tokenHolder] += token;
            totalSupply += token;
            weiGiven[_tokenHolder] += msg.value;
            CreatedToken(_tokenHolder, token);
            if (totalSupply >= minTokensToCreate && !isFueled) {
                isFueled = true;
                FuelingToDate(totalSupply);
            }
            return true;
        }
        throw;
    }

    function refund() noEther {
        if (now > closingTime && !isFueled) {
            // Execute refund
            if (msg.sender.call.value(weiGiven[msg.sender])()) {
                Refund(msg.sender, weiGiven[msg.sender]);
                totalSupply -= balances[msg.sender];
                balances[msg.sender] = 0;
                weiGiven[msg.sender] = 0;
            }
        }
    }
}
