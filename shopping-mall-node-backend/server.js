const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// 서명 검증
app.post("/web3/verify", async (req, res) => {
  const { message, signature, address } = req.body;

  try {
    const recovered = ethers.verifyMessage(message, signature);

    if (recovered.toLowerCase() === address.toLowerCase()) {
      return res.json({ valid: true, recovered });
    } else {
      return res.json({ valid: false, recovered });
    }
  } catch (err) {
    console.error("❌ 검증 실패:", err);
    return res.status(400).json({ valid: false, error: err.message });
  }
});

// 로그인 메시지 생성
app.post("/web3/message", (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: "address is required" });
  }

  const nonce = uuidv4();

  const message = `Sign this message to login.\nNonce: ${nonce}`;
  return res.json({ message });
});

app.listen(4000, () => {
  console.log("✅ Web3 전용 서버 running on http://localhost:4000");
});
