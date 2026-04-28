import Link from 'next/link'
import { userAuth } from '../lib/userAuth'
import ShowForm from './ShowForm'
import { useState } from 'react'

type Props = {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Menu({ setCollapsed }: Props) {

  const [showForm, setShowForm] = useState(false)

  const { isAdmin, isUser } = userAuth()

  const styles_links = "block px-1 py-2  rounded-lg hover:bg-gray-800 hover:text-gray-100  transition duration-200"

  const hr = <hr className="border-t-2 border-gray-800" />

  return (
    <nav className="px-2 py-1">
      <li className="flex font-black gap-2 mb-3">
        <span>BR</span>
        <img
          className='bg-white rounded-2xl'
          src="/globe.svg"
          alt="Logo"
          color='white'
          width={28}
          height={28}
          title="Brasil(BR)"
        />
      </li>
      <ul className="flex font-bold text-[14px] flex-col gap-3" >
        <li>
          <Link
            href="/dashboard"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >DASHBOARD</Link>
        </li>{hr}
        {isAdmin && <>
          {<div><a href='##' onClick={() => (setShowForm(prev => !prev))}>CADASTROS</a></div>}
          <div className="flex justify-end absolute top-61 right-[30]"> <ShowForm
            showForm={showForm}
            setShowForm={setShowForm}
          /></div>{hr}</>} {showForm && <>
            <li> <Link
              href="/generic"
              className={styles_links}
              onClick={() => setCollapsed(prev => !prev)}
            >+ ARQUIVOS</Link>
            </li>{hr}
            <li> <Link
              href="##"
              className={styles_links}
              onClick={() => setCollapsed(prev => !prev)}
            >+ FILIAIS</Link>
            </li>{hr}
            <li> <Link
              href="##"
              className={styles_links}
              onClick={() => setCollapsed(prev => !prev)}
            >+ CONFIGURAÇÕES FISCAIS</Link>
            </li>{hr}
            <li> <Link
              href="operationsale"
              className={styles_links}
              onClick={() => setCollapsed(prev => !prev)}
            >+ OPERAÇÕES DE VENDAS</Link>
            </li>{hr}
          </>}
        {isUser && <><li>
          <Link
            href="/person"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >DADOS DOS CLIENTES</Link>
        </li>
          {hr}</>}
        {isAdmin && <> <li>
          <Link
            href="/items"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >DADOS DOS ITEMS</Link>
        </li>{hr}</>}
        <li>
          <Link
            href="/sale"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >CHECK-OUT DE VENDAS</Link>
        </li>{hr}
        {isUser && <> <li>
          <Link
            href="/sales"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >CONSULTA VENDAS</Link>
        </li>{hr}</>}
        {isUser && <><li>
          <Link
            href="/accountsreceivable"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >CONTAS A RECEBER</Link>
        </li>{hr}</>}
        {isAdmin && <> <li>
          <Link
            href="/cashmovement"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >CAIXA MOVIMENTO</Link>
        </li>
          {hr}</>}
        <li>
          <Link
            href="/perfil"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >PERFIL</Link>
        </li>{hr}
        <li>
          <Link
            href="/about"
            className={styles_links}
            onClick={() => setCollapsed(prev => !prev)}
          >SOBRE !</Link>
        </li>
      </ul>
    </nav>
  )
}