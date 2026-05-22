export default function Footer() {

    const year = new Date().getFullYear()

    return (
      <footer className="bg-zinc-950 border-t border-white/10 text-white/70">
    <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Topo */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logo + informações */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <img
                    src="/logos/logo_centroinfo_new.png"
                    alt="Centro Informática"
                    className="h-14 w-auto object-contain"
                />

                <div className="space-y-1">
                    <p className="text-sm text-white font-medium">
                        Centro Informática
                    </p>

                    <p className="text-xs text-white/50">
                        CNPJ {process.env.NEXT_PUBLIC_SDK_CNPJ}
                    </p>

                    <p className="text-xs text-white/40">
                        © 2013 - {year} Todos os direitos reservados
                    </p>
                </div>
            </div>

            {/* Tecnologias */}
            <div className="flex items-center gap-3 flex-wrap justify-center">

                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition">
                    <img
                        src="/logos/github.png"
                        alt="GitHub"
                        className="h-5 w-auto"
                    />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition">
                    <img
                        src="/logos/nginx.jpg"
                        alt="Nginx"
                        className="h-5 w-auto rounded"
                    />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition">
                    <img
                        src="/logos/ssl_cert.png"
                        alt="SSL Seguro"
                        className="h-7 w-auto"
                    />
                </div>

            </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/35">
                Sistema protegido por SSL • Hospedado com alta disponibilidade
            </p>
        </div>

    </div>
</footer>
    )
}