var XRPValidator = require("./ripple_validator");
var ETHValidator = require("./ethereum_validator");
var BTCValidator = require("./bitcoin_validator");
var ADAValidator = require("./ada_validator");
var XMRValidator = require("./monero_validator");
var NANOValidator = require("./nano_validator");
var SCValidator = require("./siacoin_validator");
var TRXValidator = require("./tron_validator");
var NEMValidator = require("./nem_validator");
var LSKValidator = require("./lisk_validator");
var BCHValidator = require("./bch_validator");
var XLMValidator = require("./stellar_validator");
var EOSValidator = require("./eos_validator");
var XTZValidator = require("./tezos_validator");
var USDTValidator = require("./usdt_validator");
var AlgoValidator = require("./algo_validator");
var DotValidator = require("./dot_validator");
var BANDValidator = require("./band_validator");
var HBARValidator = require("./hbar_validator");
var IOSTValidator = require("./iost_validator");
var KSMValidator = require("./ksm_validator");
var NEARValidator = require("./near_validator");
var LUNAValidator = require("./luna_validator");
var SCRTValidator = require("./scrt_validator copy");
var ZILValidator = require("./zil_validator");
var BIP173Validator = require("./bip173_validator");
var Base58Validator = require("./base58_validator");
const { forEach } = require("lodash");

// defines P2PKH and P2SH address types for standard (prod) and testnet networks
var CURRENCIES = [
    {
        name: "Arcblock",
        symbol: "abt",
        validator: ETHValidator,
    },
    {
        name: "Aave Coin",
        symbol: "aave",
        validator: ETHValidator,
    },
    {
        name: "Cardano",
        symbol: "ada",
        bech32Hrp: { prod: ["addr"], testnet: ["addr"] },
        validator: ADAValidator,
    },
    {
        name: "Algorand",
        symbol: "algo",
        validator: AlgoValidator,
    },
    {
        name: "Alpha Venture DAO",
        symbol: "alpha",
        validator: ETHValidator,
    },
    {
        name: "Aragon",
        symbol: "ant",
        validator: ETHValidator,
    },
    {
        name: "ApeCoin",
        symbol: "ape",
        validator: ETHValidator,
    },
    {
        name: "AuroraCoin",
        symbol: "aur",
        addressTypes: {
            prod: ["17", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Avalanche",
        symbol: "avax",
        validator: ETHValidator,
    },
    {
        name: "Axie Infinity",
        symbol: "axs",
        validator: ETHValidator,
    },
    {
        name: "Balancer",
        symbol: "bal",
        validator: ETHValidator,
    },
    {
        name: "Band Protocol",
        symbol: "band",
        validator: BANDValidator,
    },
    {
        name: "Basic Attention Token",
        symbol: "bat",
        validator: ETHValidator,
    },
    {
        name: "Boba Token",
        symbol: "boba",
        validator: ETHValidator,
    },
    {
        name: "BitcoinCash",
        symbol: "bch",
        regexp: "^[qQpP]{1}[0-9a-zA-Z]{41}$",
        addressTypes: {
            prod: ["00", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BCHValidator,
    },
    {
        name: "BioCoin",
        symbol: "bio",
        addressTypes: {
            prod: ["19", "14"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Bankex",
        symbol: "bkx",
        validator: ETHValidator,
    },
    {
        name: "Binance",
        symbol: "bnb",
        validator: ETHValidator,
    },
    {
        name: "Bancor",
        symbol: "bnt",
        validator: ETHValidator,
    },
    {
        name: "Bitcoin SV",
        symbol: "bsv",
        regexp: "^[qQ]{1}[0-9a-zA-Z]{41}$",
        addressTypes: {
            prod: ["00", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BCHValidator,
    },
    {
        name: "Bitcoin",
        symbol: "btc",
        addressTypes: {
            prod: ["00", "05"],
            testnet: ["6f", "c4", "3c", "26"],
        },
        bech32Hrp: { prod: ["bc"], testnet: ["tb"] },
        validator: BTCValidator,
    },
    {
        name: "BitcoinPrivate",
        symbol: "btcp",
        expectedLength: 26,
        addressTypes: {
            prod: ["1325", "13af"],
            testnet: ["1957", "19e0"],
        },
        validator: BTCValidator,
    },
    {
        name: "BitcoinZ",
        symbol: "btcz",
        expectedLength: 26,
        addressTypes: {
            prod: ["1cb8", "1cbd"],
            testnet: ["1d25", "1cba"],
        },
        validator: BTCValidator,
    },
    {
        name: "BitcoinGold",
        symbol: "btg",
        addressTypes: {
            prod: ["26", "17"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "BlockTrade",
        symbol: "btt",
        validator: ETHValidator,
    },
    {
        name: "BTU Protocol",
        symbol: "btu",
        validator: ETHValidator,
    },
    {
        name: "Binance USD",
        symbol: "busd",
        validator: ETHValidator,
    },
    {
        name: "BeaverCoin",
        symbol: "bvc",
        addressTypes: {
            prod: ["19", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Celo",
        symbol: "celo",
        validator: ETHValidator,
    },
    {
        name: "Callisto",
        symbol: "clo",
        validator: ETHValidator,
    },
    {
        name: "Compound",
        symbol: "comp",
        validator: ETHValidator,
    },
    {
        name: "Crypto.com Coin",
        symbol: "cro",
        bech32Hrp: { prod: ["cro"], testnet: ["tcro"] },
        validator: BIP173Validator,
    },
    {
        name: "Curve DAO Token",
        symbol: "crv",
        validator: ETHValidator,
    },
    {
        name: "Chillz",
        symbol: "chz",
        validator: ETHValidator,
    },
    {
        name: "Cortex Coin",
        symbol: "ctxc",
        validator: ETHValidator,
    },
    {
        name: "CUSD",
        symbol: "cusd",
        validator: ETHValidator,
    },
    {
        name: "Civic",
        symbol: "cvc",
        validator: ETHValidator,
    },
    {
        name: "Multi-collateral DAI",
        symbol: "dai",
        validator: ETHValidator,
    },
    {
        name: "Dash",
        symbol: "dash",
        addressTypes: {
            prod: ["4c", "10"],
            testnet: ["8c", "13"],
        },
        validator: BTCValidator,
    },
    {
        name: "Decred",
        symbol: "dcr",
        addressTypes: {
            prod: ["073f", "071a"],
            testnet: ["0f21", "0efc"],
        },
        hashFunction: "blake256",
        expectedLength: 26,
        validator: BTCValidator,
    },
    {
        name: "DigiByte",
        symbol: "dgb",
        addressTypes: { prod: ["1e", "3f"], testnet: [] },
        bech32Hrp: { prod: ["dgb", "S"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "District0x",
        symbol: "dnt",
        validator: ETHValidator,
    },
    {
        name: "DogeCoin",
        symbol: "doge",
        addressTypes: {
            prod: ["1e", "16"],
            testnet: ["71", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Polkadot",
        symbol: "dot",
        validator: DotValidator,
    },
    {
        name: "dYdX",
        symbol: "dydx",
        validator: ETHValidator,
    },
    {
        name: "Enjin Coin",
        symbol: "enj",
        validator: ETHValidator,
    },
    {
        name: "Ethereum Name Service",
        symbol: "ens",
        validator: ETHValidator,
    },
    {
        name: "EOS",
        symbol: "eos",
        validator: EOSValidator,
    },
    {
        name: "EthereumClassic",
        symbol: "etc",
        validator: ETHValidator,
    },
    {
        name: "Ethereum",
        symbol: "eth",
        validator: ETHValidator,
    },
    {
        name: "EtherZero",
        symbol: "etz",
        validator: ETHValidator,
    },
    {
        name: "Expanse",
        symbol: "exp",
        validator: ETHValidator,
    },
    {
        name: "FirmaChain",
        symbol: "fct",
        validator: ETHValidator,
    },
    {
        name: "FreiCoin",
        symbol: "frc",
        addressTypes: {
            prod: ["00", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Fantom",
        symbol: "ftm",
        validator: ETHValidator,
    },
    {
        name: "FTX Token",
        symbol: "ftt",
        validator: ETHValidator,
    },
    {
        name: "Project Galaxy",
        symbol: "gal",
        validator: ETHValidator,
    },
    {
        name: "GameCredits",
        symbol: "game",
        addressTypes: { prod: ["26", "05"], testnet: [] },
        validator: ETHValidator,
    },
    {
        name: "NeoGas",
        symbol: "gas",
        addressTypes: { prod: ["17"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "Gala",
        symbol: "gala",
        validator: ETHValidator,
    },
    {
        name: "Golem",
        symbol: "glm",
        validator: ETHValidator,
    },
    {
        name: "Gnosis",
        symbol: "gno",
        validator: ETHValidator,
    },
    {
        name: "Golem (GNT)",
        symbol: "gnt",
        validator: ETHValidator,
    },
    {
        name: "GarliCoin",
        symbol: "grlc",
        addressTypes: {
            prod: ["26", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "The Graph",
        symbol: "grt",
        validator: ETHValidator,
    },
    {
        name: "Gate Token",
        symbol: "gt",
        validator: ETHValidator,
    },
    {
        name: "GuildFi",
        symbol: "gf",
        validator: ETHValidator,
    },
    {
        name: "Matchpool",
        symbol: "gup",
        validator: ETHValidator,
    },
    {
        name: "Hedera Hashgraph",
        symbol: "hbar",
        validator: HBARValidator,
    },
    {
        name: "HedgeTrade",
        symbol: "hedg",
        validator: ETHValidator,
    },
    {
        name: "Hush",
        symbol: "hush",
        expectedLength: 26,
        addressTypes: {
            prod: ["1cb8", "1cbd"],
            testnet: ["1d25", "1cba"],
        },
        validator: BTCValidator,
    },
    {
        name: "Illuvium",
        symbol: "ilv",
        validator: ETHValidator,
    },
    {
        name: "Immutable X",
        symbol: "imx",
        validator: ETHValidator,
    },
    {
        name: "IOSToken",
        symbol: "iost",
        validator: IOSTValidator,
    },
    {
        name: "Kusama",
        symbol: "ksm",
        validator: KSMValidator,
    },
    {
        name: "NEAR",
        symbol: "near",
        validator: NEARValidator,
    },
    {
        name: "JFIN Coin",
        symbol: "jfin",
        validator: ETHValidator,
    },
    {
        name: "Komodo",
        symbol: "kmd",
        addressTypes: {
            prod: ["3c", "55"],
            testnet: ["0", "5"],
        },
        validator: BTCValidator,
    },
    {
        name: "Kyber Network Crystal",
        symbol: "knc",
        validator: ETHValidator,
    },
    {
        name: "Bitkub",
        symbol: "kub",
        validator: ETHValidator,
    },
    {
        name: "Cred",
        symbol: "lba",
        validator: ETHValidator,
    },
    {
        name: "LBRY Credits",
        symbol: "lbc",
        addressTypes: { prod: ["55"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "Chainlink",
        symbol: "link",
        validator: ETHValidator,
    },
    {
        name: "loki",
        symbol: "loki",
        addressTypes: {
            prod: ["114", "115", "116"],
            testnet: [],
        },
        iAddressTypes: { prod: ["115"], testnet: [] },
        validator: XMRValidator,
    },
    {
        name: "Loom Network",
        symbol: "loom",
        validator: ETHValidator,
    },
    {
        name: "Lisk",
        symbol: "lsk",
        validator: LSKValidator,
    },
    {
        name: "Loopring",
        symbol: "lrc",
        validator: ETHValidator,
    },
    {
        name: "LiteCoin",
        symbol: "ltc",
        addressTypes: {
            prod: ["30", "05", "32"],
            testnet: ["6f", "c4", "3a"],
        },
        bech32Hrp: { prod: ["ltc"], testnet: ["tltc"] },
        validator: BTCValidator,
    },
    {
        name: "Terra",
        symbol: "luna",
        validator: LUNAValidator,
    },
    {
        name: "Lukso",
        symbol: "lyxe",
        validator: ETHValidator,
    },
    {
        name: "Decentraland",
        symbol: "mana",
        validator: ETHValidator,
    },
    {
        name: "Matic",
        symbol: "matic",
        validator: ETHValidator,
    },
    {
        name: "MegaCoin",
        symbol: "mec",
        addressTypes: {
            prod: ["32", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Maker",
        symbol: "mkr",
        validator: ETHValidator,
    },
    {
        name: "Melon",
        symbol: "mln",
        validator: ETHValidator,
    },
    {
        name: "MonaCoin",
        symbol: "mona",
        addressTypes: { prod: ["32", "37"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "Metal",
        symbol: "mtl",
        validator: ETHValidator,
    },
    {
        name: "Nano",
        symbol: "nano",
        validator: NANOValidator,
    },
    {
        name: "Neo",
        symbol: "neo",
        addressTypes: { prod: ["17"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "NameCoin",
        symbol: "nmc",
        addressTypes: { prod: ["34"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "Numeraire",
        symbol: "nmr",
        validator: ETHValidator,
    },
    {
        name: "Ocean Protocol",
        symbol: "ocean",
        validator: ETHValidator,
    },
    {
        name: "Odyssey",
        symbol: "ocn",
        validator: ETHValidator,
    },
    {
        name: "OmiseGO",
        symbol: "omg",
        validator: ETHValidator,
    },
    {
        name: "Optimisn",
        symbol: "op",
        validator: ETHValidator,
    },
    {
        name: "Paxos",
        symbol: "pax",
        validator: ETHValidator,
    },
    {
        name: "TenX",
        symbol: "pay",
        validator: ETHValidator,
    },
    {
        name: "PIVX",
        symbol: "pivx",
        addressTypes: { prod: ["1e", "0d"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "Polymath",
        symbol: "poly",
        validator: ETHValidator,
    },
    {
        name: "Power Ledger",
        symbol: "pow",
        validator: ETHValidator,
    },
    {
        name: "PeerCoin",
        symbol: "ppc",
        addressTypes: {
            prod: ["37", "75"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "ProtoShares",
        symbol: "pts",
        addressTypes: {
            prod: ["38", "05"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "Quant",
        symbol: "qnt",
        validator: ETHValidator,
    },
    {
        name: "Quantum Resistant Ledger",
        symbol: "qrl",
        validator: ETHValidator,
    },
    {
        name: "Qtum",
        symbol: "qtum",
        addressTypes: {
            prod: ["3a", "32"],
            testnet: ["78", "6e"],
        },
        validator: BTCValidator,
    },
    {
        name: "Ripio Credit Network",
        symbol: "rcn",
        validator: ETHValidator,
    },
    {
        name: "Augur",
        symbol: "rep",
        validator: ETHValidator,
    },
    {
        name: "AugurV2",
        symbol: "repv2",
        validator: ETHValidator,
    },
    {
        name: "iExec RLC",
        symbol: "rlc",
        validator: ETHValidator,
    },
    {
        name: "Salt",
        symbol: "salt",
        validator: ETHValidator,
    },
    {
        name: "The Sandbox",
        symbol: "sand",
        validator: ETHValidator,
    },
    {
        name: "Siacoin",
        symbol: "sc",
        validator: SCValidator,
    },
    {
        name: "Secret Network",
        symbol: "scrt",
        validator: SCRTValidator,
    },
    {
        name: "Serve",
        symbol: "serv",
        validator: ETHValidator,
    },
    {
        name: "SIX",
        symbol: "six",
        validator: XLMValidator,
    },
    {
        name: "SolarCoin",
        symbol: "slr",
        addressTypes: { prod: ["12", "05"], testnet: [] },
        validator: BTCValidator,
    },
    {
        name: "SnowGem",
        symbol: "sng",
        expectedLength: 26,
        addressTypes: {
            prod: ["1c28", "1c2d"],
            testnet: ["1d25", "1cba"],
        },
        validator: BTCValidator,
    },
    {
        name: "Status",
        symbol: "snt",
        validator: ETHValidator,
    },
    {
        name: "Synthetix Network",
        symbol: "snx",
        validator: ETHValidator,
    },
    {
        name: "Solana",
        symbol: "sol",
        validator: Base58Validator,
        maxLength: 44,
        minLength: 43,
    },
    {
        name: "SOLVE",
        symbol: "solve",
        validator: ETHValidator,
    },
    {
        name: "Spendcoin",
        symbol: "spnd",
        validator: ETHValidator,
    },
    {
        name: "StormX",
        symbol: "stmx",
        validator: ETHValidator,
    },
    {
        name: "Storj",
        symbol: "storj",
        validator: ETHValidator,
    },
    {
        name: "Storm",
        symbol: "storm",
        validator: ETHValidator,
    },
    {
        name: "SushiSwap",
        symbol: "sushi",
        validator: ETHValidator,
    },
    {
        name: "Swarm City",
        symbol: "swt",
        validator: ETHValidator,
    },
    {
        name: "TEMCO",
        symbol: "temco",
        validator: ETHValidator,
    },
    {
        name: "Tron",
        symbol: "trx",
        addressTypes: { prod: [65], testnet: [160] },
        validator: TRXValidator,
    },
    {
        name: "TrueUSD",
        symbol: "tusd",
        validator: ETHValidator,
    },
    {
        name: "Uniswap Coin",
        symbol: "uni",
        validator: ETHValidator,
    },
    {
        name: "USD Coin",
        symbol: "usdc",
        validator: ETHValidator,
    },
    {
        name: "Tether",
        symbol: "usdt",
        addressTypes: {
            prod: ["00", "05"],
            testnet: ["6f", "c4"],
        },
        validator: USDTValidator,
    },
    {
        name: "VeChain",
        symbol: "vet",
        validator: ETHValidator,
    },
    {
        name: "Viberate",
        symbol: "vib",
        validator: ETHValidator,
    },
    {
        name: "VoteCoin",
        symbol: "vot",
        expectedLength: 26,
        addressTypes: {
            prod: ["1cb8", "1cbd"],
            testnet: ["1d25", "1cba"],
        },
        validator: BTCValidator,
    },
    {
        name: "VertCoin",
        symbol: "vtc",
        addressTypes: {
            prod: ["0x", "47", "71", "05"],
            testnet: ["6f", "c4"],
        },
        bech32Hrp: { prod: ["vtc"], testnet: ["tvtc"] },
        validator: BTCValidator,
    },
    {
        name: "Wancoin",
        symbol: "wan",
        validator: ETHValidator,
    },
    {
        name: "Waves",
        symbol: "waves",
        addressTypes: { prod: ["0157"], testnet: ["0154"] },
        expectedLength: 26,
        hashFunction: "blake256keccak256",
        regex: /^[a-zA-Z0-9]{35}$/,
        validator: BTCValidator,
    },
    {
        name: "Wings",
        symbol: "wings",
        validator: ETHValidator,
    },
    {
        name: "Nem",
        symbol: "xem",
        validator: NEMValidator,
    },
    {
        name: "Stellar",
        symbol: "xlm",
        validator: XLMValidator,
    },
    {
        name: "Monero",
        symbol: "xmr",
        addressTypes: {
            prod: ["18", "42"],
            testnet: ["53", "63"],
            stagenet: ["24"],
        },
        iAddressTypes: {
            prod: ["19"],
            testnet: ["54"],
            stagenet: ["25"],
        },
        validator: XMRValidator,
    },
    {
        name: "PrimeCoin",
        symbol: "xpm",
        addressTypes: {
            prod: ["17", "53"],
            testnet: ["6f", "c4"],
        },
        validator: BTCValidator,
    },
    {
        name: "RaiBlocks",
        symbol: "xrb",
        validator: NANOValidator,
    },
    {
        name: "Ripple",
        symbol: "xrp",
        validator: XRPValidator,
    },
    {
        name: "HyperSpace",
        symbol: "xsc",
        validator: SCValidator,
    },
    {
        name: "Tap",
        symbol: "xtp",
        validator: ETHValidator,
    },
    {
        name: "Tezos",
        symbol: "xtz",
        validator: XTZValidator,
    },
    {
        name: "Yearn Finance",
        symbol: "yfi",
        validator: ETHValidator,
    },
    {
        name: "ZClassic",
        symbol: "zcl",
        expectedLength: 26,
        addressTypes: {
            prod: ["1cb8", "1cbd"],
            testnet: ["1d25", "1cba"],
        },
        validator: BTCValidator,
    },
    {
        name: "ZCash",
        symbol: "zec",
        expectedLength: 26,
        addressTypes: {
            prod: ["1cb8", "1cbd"],
            testnet: ["1d25", "1cba"],
        },
        validator: BTCValidator,
    },
    {
        name: "ZenCash",
        symbol: "zen",
        expectedLength: 26,
        addressTypes: {
            prod: ["2089", "2096"],
            testnet: ["2092", "2098"],
        },
        validator: BTCValidator,
    },
    {
        name: "Zilliqa",
        symbol: "zil",
        validator: ZILValidator,
    },
    {
        name: "0x",
        symbol: "zrx",
        validator: ETHValidator,
    },
];

module.exports = {
    getByNameOrSymbol: function (currencyNameOrSymbol) {
        var nameOrSymbol = currencyNameOrSymbol.toLowerCase();
        return CURRENCIES.find(function (currency) {
            return (
                currency.name.toLowerCase() === nameOrSymbol ||
                currency.symbol.toLowerCase() === nameOrSymbol
            );
        });
    },
    getAll: function () {
        return CURRENCIES;
    },
};

// CURRENCIES.sort((a, b) =>
//     a.symbol.toUpperCase() > b.symbol.toUpperCase() ? 1 : -1
// ).forEach((c) => console.log('"' + c.symbol + " (" + c.name + ')",'));

////spit out details for readme.md
// CURRENCIES
//     .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
//     .forEach(c => console.log(`* ${c.name}/${c.symbol} \`'${c.name}'\` or \`'${c.symbol}'\` `));

////spit out keywords for package.json
// CURRENCIES
//     .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
//     .forEach(c => console.log(`"${c.name}","${c.symbol}",`));
//
