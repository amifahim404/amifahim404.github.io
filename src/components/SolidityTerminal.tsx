import { useState } from "react";
import { Terminal, Cpu, Play, CheckCircle2, RefreshCw, Send, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CONTRACT_TEMPLATES = [
  {
    name: "FahimStickerEscrow.sol",
    explanation: "Secure decentralized peer-to-peer design distribution escrow contract with built-in branding royalty payouts.",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FahimStickerEscrow is Ownable {
    IERC20 public paymentToken;
    uint256 public constant COMMISSION_RATE = 250; // 2.5%
    
    struct Deal {
        address client;
        address designer;
        uint256 price;
        bool isCompleted;
        bool isRefunded;
    }
    
    mapping(uint256 => Deal) public deals;
    uint256 public dealCount;

    event DealCreated(uint256 indexed dealId, address client, address designer, uint256 price);
    event DealCompleted(uint256 indexed dealId);

    constructor(address _token) Ownable(msg.sender) {
        paymentToken = IERC20(_token);
    }

    function createDeal(address _designer, uint256 _price) external {
        paymentToken.transferFrom(msg.sender, address(this), _price);
        dealCount++;
        deals[dealCount] = Deal(msg.sender, _designer, _price, false, false);
        emit DealCreated(dealCount, msg.sender, _designer, _price);
    }

    function completeDeal(uint256 _dealId) external {
        Deal storage deal = deals[_dealId];
        require(msg.sender == deal.client || msg.sender == owner(), "Unauthorized");
        require(!deal.isCompleted && !deal.isRefunded, "Ended");
        
        uint256 commission = (deal.price * COMMISSION_RATE) / 10000;
        uint256 designerPayout = deal.price - commission;
        
        deal.isCompleted = true;
        paymentToken.transfer(deal.designer, designerPayout);
        paymentToken.transfer(owner(), commission);
        emit DealCompleted(_dealId);
    }
}`
  },
  {
    name: "AIGovernedBotToken.sol",
    explanation: "Governance token integrating AI bot analytics triggering automated burn and liquidity additions based on Telegram bot API calls.",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AIGovernedBotToken is ERC20, AccessControl {
    bytes32 public constant BOT_OPERATOR_ROLE = keccak256("BOT_OPERATOR_ROLE");
    uint256 public burnRateBasisPoints = 100; // 1% burn on transactions
    
    event AIBurnTriggered(uint256 burnedAmount, string botReportUuid);

    constructor() ERC20("Fahim Bot Token", "FBT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BOT_OPERATOR_ROLE, msg.sender);
        _mint(msg.sender, 10000000 * 10**decimals());
    }

    function triggerAutomaticBurn(uint256 _amount, string calldata _reportUuid) external onlyRole(BOT_OPERATOR_ROLE) {
        _burn(msg.sender, _amount);
        emit AIBurnTriggered(_amount, _reportUuid);
    }

    function adjustBurnRate(uint256 _newRate) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_newRate <= 500, "Max burn rate is 5%");
        burnRateBasisPoints = _newRate;
    }
}`
  }
];

export default function SolidityTerminal() {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [compilerState, setCompilerState] = useState<"idle" | "compiling" | "compiled">("idle");
  const [deployedState, setDeployedState] = useState<"idle" | "deploying" | "deployed">("idle");
  const [contractAddress, setContractAddress] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [simulatedBalances, setSimulatedBalances] = useState<Record<string, number>>({
    "0xFahim...8888": 5000000,
    "0xClient...7777": 2500000,
    "0xContract": 0
  });
  
  const [transferAmount, setTransferAmount] = useState("100000");
  const [transferTarget, setTransferTarget] = useState("0xFahim...8888");

  const template = CONTRACT_TEMPLATES[selectedTemplateIndex];

  const logInfo = (text: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`]);
  };

  const handleCompile = () => {
    if (compilerState === "compiling") return;
    setCompilerState("compiling");
    setLogs([]);
    logInfo("solc compiler selected: v0.8.20+commit.5a16337e");
    logInfo("Analyzing dependency tree... OpenZeppelin ERC20 loaded.");
    
    setTimeout(() => {
      logInfo("Running optimization sweeps (runs: 200)...");
    }, 400);

    setTimeout(() => {
      logInfo("Gas cost estimation calculated.");
      logInfo(`Compilation successful: ${template.name} built.`);
      setCompilerState("compiled");
    }, 1200);
  };

  const handleDeploy = () => {
    if (deployedState === "deploying" || compilerState !== "compiled") return;
    setDeployedState("deploying");
    logInfo("Initializing Ethereum Virtual Machine Sandbox environment...");
    logInfo("Requesting current gas price from simulated Sepolia Provider...");

    setTimeout(() => {
      const randomAddr = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
      const partialAddr = `${randomAddr.substring(0, 6)}...${randomAddr.substring(34)}`;
      setContractAddress(partialAddr);
      logInfo(`Deploying from account 0xCreatorWithFahim...`);
      logInfo(`Transaction mined! gas used: 834,192`);
      logInfo(`Contract instantiated at local address: ${partialAddr}`);
      setDeployedState("deployed");
    }, 1500);
  };

  const handleSimulateAction = () => {
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;

    if (simulatedBalances["0xClient...7777"] < amt) {
      logInfo("ERROR: VM revert! ERC20: transfer amount exceeds balance");
      return;
    }

    logInfo(`Solidity call triggered: createDeal(${transferTarget}, ${amt})`);
    
    // deduct from client, add to contract
    setSimulatedBalances((prev) => ({
      ...prev,
      "0xClient...7777": prev["0xClient...7777"] - amt,
      "0xContract": prev["0xContract"] + amt
    }));

    setTimeout(() => {
      logInfo(`SUCCESS: Deal created. payment of ${amt} escrowed in contract balance!`);
    }, 500);
  };

  const handleReleaseEscrow = () => {
    const total = simulatedBalances["0xContract"];
    if (total <= 0) {
      logInfo("ERROR: VM revert! Escrow balance is empty.");
      return;
    }

    logInfo("Solidity call triggered: completeDeal(1)");
    
    const commission = (total * 250) / 10000;
    const designerPayout = total - commission;

    setSimulatedBalances((prev) => ({
      ...prev,
      "0xContract": 0,
      "0xFahim...8888": prev["0xFahim...8888"] + designerPayout,
      "0xCreatorWithFahim": (prev["0xCreatorWithFahim"] || 0) + commission
    }));

    setTimeout(() => {
      logInfo(`ESCROW COMPLETED: Released ${designerPayout} to Designer, Paid Professional Royalty Commission: ${commission} to Portfolio Admin Address!`);
    }, 600);
  };

  const resetSimulation = () => {
    setCompilerState("idle");
    setDeployedState("idle");
    setContractAddress("");
    setLogs([]);
    setSimulatedBalances({
      "0xFahim...8888": 5000000,
      "0xClient...7777": 2500000,
      "0xContract": 0
    });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Code Editor Column */}
      <div className="lg:col-span-7 flex flex-col glass-panel rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl hover-glow-red">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/20 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="text-xs font-mono ml-3 text-zinc-400">Solidity compiler studio</span>
          </div>
          <div className="flex gap-2">
            {CONTRACT_TEMPLATES.map((tmpl, idx) => (
              <button
                key={tmpl.name}
                onClick={() => {
                  setSelectedTemplateIndex(idx);
                  resetSimulation();
                }}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                  selectedTemplateIndex === idx
                    ? "bg-red-950 border border-red-800 text-red-200"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-zinc-900/40 border-b border-zinc-900">
          <p className="text-sm font-sans text-zinc-300 leading-relaxed">
            <span className="text-red-500 font-semibold font-mono">⚡ Detail: </span>
            {template.explanation}
          </p>
        </div>

        {/* Code View */}
        <div className="relative p-5 overflow-auto max-h-[420px] font-mono text-[11px] md:text-xs leading-5 text-zinc-300 select-all">
          <div className="absolute right-4 top-4 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
            Read-Only
          </div>
          <pre className="overflow-x-auto text-left">
            <code>
              {template.code.split("\n").map((line, i) => (
                <div key={i} className="flex hover:bg-zinc-900/60 transition-colors">
                  <span className="w-8 select-none text-zinc-600 text-right pr-4">{i + 1}</span>
                  <span className={
                    line.includes("contract") || line.includes("function")
                      ? "text-red-400 font-semibold"
                      : line.includes("mapping") || line.includes("struct")
                      ? "text-rose-400"
                      : line.startsWith("  //") || line.startsWith("//")
                      ? "text-zinc-500 italic"
                      : line.includes("emit") || line.includes("require")
                      ? "text-orange-400"
                      : "text-zinc-300"
                  }>
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Simulator Column */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Actions panel */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 bg-zinc-950/95 flex flex-col gap-5 backdrop-blur-xl hover-glow-red">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-3">
            <Terminal className="text-red-500 w-5 h-5" />
            <h3 className="font-semibold text-lg font-sans tracking-tight">VM EVM Block Execution</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCompile}
              disabled={compilerState === "compiling" || compilerState === "compiled"}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all ${
                compilerState === "compiled"
                  ? "bg-transparent border-emerald-500/20 text-emerald-400"
                  : compilerState === "compiling"
                  ? "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-red-950/80 hover:bg-red-900 border-red-500/40 text-red-200"
              }`}
            >
              {compilerState === "compiling" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : compilerState === "compiled" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Cpu className="w-4 h-4" />
              )}
              {compilerState === "compiled" ? "Compiled" : compilerState === "compiling" ? "Compiling..." : "Compile Code"}
            </button>

            <button
              onClick={handleDeploy}
              disabled={compilerState !== "compiled" || deployedState !== "idle"}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all ${
                deployedState === "deployed"
                  ? "bg-transparent border-emerald-500/20 text-emerald-400"
                  : deployedState === "deploying"
                  ? "bg-zinc-900 border-zinc-800 text-zinc-500"
                  : compilerState !== "compiled"
                  ? "bg-zinc-900/20 border-zinc-900 text-zinc-600 cursor-not-allowed"
                  : "bg-zinc-900 hover:bg-zinc-850 border-red-500/20 text-zinc-200 hover:border-red-500/50"
              }`}
            >
              {deployedState === "deploying" ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : deployedState === "deployed" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {deployedState === "deployed" ? "Deployed" : deployedState === "deploying" ? "Deploying..." : "Deploy VM"}
            </button>
          </div>

          {deployedState === "deployed" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col gap-3 text-xs font-mono"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Contract Address:</span>
                <span className="text-red-400 font-bold select-all">{contractAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Token Decimals:</span>
                <span className="text-zinc-300">18 (Standard)</span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800 mt-2 pt-2">
                <span className="text-zinc-400 font-sans font-medium">Escrow State Balances:</span>
              </div>
              <div className="flex flex-col gap-1 text-zinc-300">
                <div className="flex justify-between">
                  <span>🤵 Client Balance:</span>
                  <span>{(simulatedBalances["0xClient...7777"] / 10**6).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span>🏢 Escrow Contract Address:</span>
                  <span className="text-orange-400">{(simulatedBalances["0xContract"] / 10**6).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>🎨 Fahim's Wallet Address:</span>
                  <span>{(simulatedBalances["0xFahim...8888"] / 10**6).toFixed(2)} USDT</span>
                </div>
              </div>

              {/* simulated input transaction */}
              <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-zinc-800">
                <label className="text-[10px] text-zinc-500">MOCK CREATE ESCROW TRANSACTION</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800/80 rounded px-2 py-1.5 text-zinc-300 text-xs focus:outline-none focus:border-red-500 w-1/2"
                    placeholder="Amount"
                  />
                  <button
                    onClick={handleSimulateAction}
                    className="bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 rounded px-3 py-1.5 text-xs font-sans font-medium transition-colors w-1/2"
                  >
                    Execute
                  </button>
                </div>
                {simulatedBalances["0xContract"] > 0 && (
                  <button
                    onClick={handleReleaseEscrow}
                    className="mt-1.5 w-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 rounded py-2 text-xs font-sans font-medium transition-colors animate-pulse"
                  >
                    Release Completed Work funds 🔓
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {compilerState !== "idle" && (
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-zinc-500">Compiler Logs Console</span>
              <button onClick={resetSimulation} className="text-zinc-500 hover:text-red-400 text-[10px] uppercase font-mono">
                Reset
              </button>
            </div>
          )}

          {/* Logs scroll console */}
          {logs.length > 0 && (
            <div className="h-[150px] p-4 rounded-xl bg-zinc-950 border border-zinc-900 overflow-y-auto font-mono text-[10px] leading-relaxed text-zinc-400 scrollbar-thin">
              <AnimatePresence initial={false}>
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      log.includes("successful") || log.includes("SUCCESS") || log.includes("Mined")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("ERROR")
                        ? "text-red-400"
                        : log.includes("solc") 
                        ? "text-blue-400 font-bold"
                        : "text-zinc-400"
                    }
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
