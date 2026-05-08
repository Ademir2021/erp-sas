export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="bg-black text-[12px] text-white/60 p-2">
            <div className="text-center">
                <span>CNPJ {process.env.NEXT_PUBLIC_SDK_CNPJ}</span>
                <p>Todos os direitos reservados 2021 - {year}</p>
            </div>
            <div className="flex items-center justify-center gap-4 mb-2 mt-2">
                <span className="text-sm text-white">Powered by: Centro Informática. </span>
                <img
                    src="/logos/github.png"
                    alt="Logo 1"
                    className="h-8 w-auto border border-white/60 rounded"
                />

                <img
                    src="/logos/nginx.jpg"
                    alt="Logo 2"
                    className="h-8 w-auto border border-white/60 rounded"
                />

                <img
                    src="/logos/ssl_cert.png"
                    alt="Logo 3"
                    className="h-8 w-auto  ml-6"
                />
            </div>

        </footer>
    )
}