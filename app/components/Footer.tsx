export default function Footer (){

    const year = new Date().getFullYear()

    return<>
    <footer className="bg-gray-900 text-white p-4 text-center">
          <p>Todos os Direitos Reservados 2021 - {year} </p>
        </footer>

    </>
}