import Link from 'next/link'
import Image from 'next/image'
import { userAuth } from '../lib/userAuth'

type Props = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Menu({ setCollapsed }: Props) {

  const { isAdmin, isUser } = userAuth()

  const styles_links = "block px-2 py-2 rounded-lg text-white-600 hover:bg-gray-600 hover:text-white-200 font-bold transition duration-200"

  return (
    <nav className="px-4 py-6"  onClick={() => setCollapsed(prev => !prev)} >
      <li className="flex items-center gap-1 mb-5 font-bold">
        <span>BR</span>
        <Image
          src="/globe.svg"
          alt="Logo"
          color='white'
          width={26}
          height={26}
          title="BR"
        />
      </li><hr />
      <ul className="flex flex-col gap-4" >
        <li>
          <Link
            href="/dashboard"
            className={styles_links}
          >DashBoard</Link>
        </li><hr />
        {isUser && <><li>
          <Link
            href="/person"
            className={styles_links}
          >Dados do Cliente</Link>
        </li>
          <hr /></>}
        {isAdmin && <> <li>
          <Link
            href="/items"
            className={styles_links}
          >Dados dos Items</Link>
        </li><hr /></>}
        <li>
          <Link
            href="/sale"
            className={styles_links}
          >Console de Venda</Link>
        </li><hr />
        {isUser && <> <li>
          <Link
            href="/sales"
            className={styles_links}
          >Vendas</Link>
        </li><hr /></>}
        {isUser && <><li>
          <Link
            href="/accountsreceivable"
            className={styles_links}
          >Contas a Receber</Link>
        </li><hr /></>}
        {isAdmin && <> <li>
          <Link
            href="/cashmovement"
            className={styles_links}
          >Caixa Movimento</Link>
        </li>
          <hr /></>}
        <li>
          <Link
            href="/perfil"
            className={styles_links}
          >Perfil</Link>
        </li><hr />
        <li>
          <Link
            href="/about"
            className={styles_links}
          >Sobre</Link>
        </li>
      </ul>
    </nav>
  )
}