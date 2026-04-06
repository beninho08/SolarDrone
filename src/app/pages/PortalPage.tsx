import { useState } from "react";
import { Link } from "react-router";

export default function PortalPage() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length > 0) {
      console.log("Code submitted:", code);
      // Handle document retrieval
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-8">
      {/* Logo */}
      <div className="absolute top-10 left-10">
        <Link to="/" className="text-[#1C1A16] font-medium text-[17px] tracking-tight">
          SolarDrone
        </Link>
      </div>

      {/* Main Card - Centered */}
      <div className="w-full max-w-[500px]">
        <h1 className="font-['Lora'] text-[48px] leading-[1.2] text-[#1C1A16] text-center mb-8">
          Kérjük, adja meg az egyedi kódját
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="XXXX-XXXX-XXXX"
            className="w-full px-6 py-4 bg-transparent border border-[#C8C2B4] text-[#1C1A16] text-[17px] focus:outline-none focus:border-[#C17D3C] transition-colors rounded-[4px]"
            required
          />

          <button
            type="submit"
            className="w-full px-8 py-4 bg-[#1C1A16] text-[#F5F0E8] text-[17px] transition-all hover:bg-[#C17D3C]"
          >
            Dokumentum megnyitása
          </button>
        </form>

        <p className="text-[12px] text-[#7A7468] text-center mt-6">
          A kód az Ön emailjére érkezett.
        </p>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-[17px] text-[#7A7468] hover:text-[#C17D3C] transition-colors"
          >
            ← Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}
