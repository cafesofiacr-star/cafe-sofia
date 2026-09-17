import { useEffect, useRef, useState } from "react";
import { CHIPS, GREETING, VOICE_DEMOS } from "../data.js";
import { ChatIcon, CloseIcon, TextModeIcon, MicIcon, SendIcon } from "../icons.jsx";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("texto");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [voiceState, setVoiceState] = useState("idle"); // idle | listening | result
  const [voiceDemoIdx, setVoiceDemoIdx] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ who: "bot", text: GREETING }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  function handleChip(chip) {
    setMessages((m) => [...m, { who: "user", text: chip.q }]);
    setTimeout(() => {
      setMessages((m) => [...m, { who: "bot", text: chip.a }]);
    }, 450);
  }

  function sendTyped() {
    const val = inputValue.trim();
    if (!val) return;
    setMessages((m) => [...m, { who: "user", text: val }]);
    setInputValue("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          who: "bot",
          text: "Con gusto te ayudo. Este es un prototipo, así que por ahora respondo con ejemplos — probá una de las preguntas sugeridas abajo."
        }
      ]);
    }, 450);
  }

  function handleMic() {
    setVoiceState("listening");
    setTimeout(() => {
      setVoiceState("result");
    }, 1300);
  }

  function handleMicAgain() {
    setVoiceDemoIdx((i) => i + 1);
    handleMic();
  }

  const demo = VOICE_DEMOS[voiceDemoIdx % VOICE_DEMOS.length];

  return (
    <>
      <button className="chat-launcher" aria-label="Abrir asistente SofIA" onClick={() => setOpen(true)}>
        <ChatIcon />
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div className="who">
              <span className="dot" />
              <div>
                <h3>SofIA</h3>
                <span>Asistente virtual · Café SofIA</span>
              </div>
            </div>
            <button className="chat-close" aria-label="Cerrar chat" onClick={() => setOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className="chat-modes">
            <button className="mode-btn" aria-pressed={mode === "texto" ? "true" : "false"} onClick={() => setMode("texto")}>
              <TextModeIcon /> Texto
            </button>
            <button className="mode-btn" aria-pressed={mode === "voz" ? "true" : "false"} onClick={() => setMode("voz")}>
              <MicIcon /> Voz
            </button>
          </div>

          {mode === "texto" ? (
            <>
              <div className="chat-body" ref={bodyRef}>
                {messages.map((m, i) => (
                  <div className={"bubble " + m.who} key={i}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="chips">
                {CHIPS.map((c) => (
                  <button className="chip" key={c.q} onClick={() => handleChip(c)}>
                    {c.q}
                  </button>
                ))}
              </div>
              <div className="chat-text-input">
                <input
                  type="text"
                  placeholder="Escribí tu mensaje…"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendTyped();
                  }}
                />
                <button className="send-btn" aria-label="Enviar" onClick={sendTyped}>
                  <SendIcon />
                </button>
              </div>
            </>
          ) : (
            <div className="voice-pane">
              {voiceState === "idle" && (
                <>
                  <button className="mic-btn" aria-label="Mantén presionado para hablar" onClick={handleMic}>
                    <MicIcon />
                  </button>
                  <div className="mic-hint">Toca el micrófono y hacé tu consulta en voz alta</div>
                </>
              )}
              {voiceState === "listening" && (
                <>
                  <div className="waveform">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <div className="mic-hint">Escuchando…</div>
                </>
              )}
              {voiceState === "result" && (
                <>
                  <div className="bubble user center">Transcripción: "{demo.t}"</div>
                  <div className="bubble bot center">{demo.a}</div>
                  <button className="mic-btn" aria-label="Hablar de nuevo" onClick={handleMicAgain}>
                    <MicIcon />
                  </button>
                  <div className="mic-hint">Tocá el micrófono para otra consulta de ejemplo</div>
                </>
              )}
            </div>
          )}

          <div className="sim-note">Modo de ejemplo — en la versión conectada, SofIA usará IA y reconocimiento de voz reales.</div>
        </div>
      )}
    </>
  );
}
