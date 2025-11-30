export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-2">GYS Importplast EIRL</h3>
            <p className="text-sm text-white/70">
              Innovando para un futuro más verde.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-white/70 hover:text-white" href="#">
                  Inicio
                </a>
              </li>
              <li>
                <a className="text-white/70 hover:text-white" href="#">
                  Productos
                </a>
              </li>
              <li>
                <a className="text-white/70 hover:text-white" href="#">
                  Nosotros
                </a>
              </li>
              <li>
                <a className="text-white/70 hover:text-white" href="#">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-white/70 hover:text-white" href="/terms">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a className="text-white/70 hover:text-white" href="/policy">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>info@gysimport.com</li>
              <li>+51 123 456 789</li>
              <li>Lima, Perú</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/50">
          <p>© 2024 GYS Importplast EIRL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
