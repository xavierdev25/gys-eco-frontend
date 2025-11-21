interface AuthToggleProps {
  activeMode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
}

export default function AuthToggle({
  activeMode,
  onModeChange,
}: AuthToggleProps) {
  return (
    <div className="flex h-12 items-center justify-center rounded-lg bg-[#f6f8f6] p-1 mb-6">
      <button
        type="button"
        onClick={() => onModeChange("login")}
        className={`flex h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-semibold leading-normal transition-all duration-200 ${
          activeMode === "login"
            ? "bg-[#FFFFFF] shadow-md text-[#1B4332]"
            : "text-[#68865f]"
        }`}
      >
        <span className="truncate">Iniciar Sesión</span>
      </button>
      <button
        type="button"
        onClick={() => onModeChange("register")}
        className={`flex h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-semibold leading-normal transition-all duration-200 ${
          activeMode === "register"
            ? "bg-[#FFFFFF] shadow-md text-[#1B4332]"
            : "text-[#68865f]"
        }`}
      >
        <span className="truncate">Registrarse</span>
      </button>
    </div>
  );
}
