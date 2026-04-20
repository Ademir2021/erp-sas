export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="bg-black/60 text-white p-4 text-center">
            <span>CNPJ {process.env.NEXT_PUBLIC_SDK_CNPJ}</span>
            <p>Todos os Direitos Reservados 2021 - {year} </p>
        </footer>
    )
}