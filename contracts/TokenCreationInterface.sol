contract TokenCreationInterface {

    // End of token creation, in Unix time
    uint public closingTime;

    // Minimum fueling goal of the token creation, denominated in tokens to
    // be created
    uint public minTokensToCreate;

    // True if the DAO reached its minimum fueling goal, false otherwise
    bool public isFueled;

    // tracks the amount of wei given from each contributor (used for refund)
    mapping (address => uint256) weiGiven;


    /// @notice Create Token with `_tokenHolder` as the initial owner of the Token
    /// @param _tokenHolder The address of the Tokens's recipient
    /// @return Whether the token creation was successful
    function createTokenProxy(address _tokenHolder) returns (bool success);

    /// @notice Refund `msg.sender` in the case the Token Creation did
    /// not reach its minimum fueling goal
    function refund();

    event FuelingToDate(uint value);
    event CreatedToken(address indexed to, uint amount);
    event Refund(address indexed to, uint value);
}
