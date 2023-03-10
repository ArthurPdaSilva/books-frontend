import React, { useState } from "react";
import styles from "./styles.module.scss";

import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";

import Image from "next/image";
import Link from "next/link";
import useIcons from "@/hooks/useIcons";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { checked } = useTheme();
  const {
    MdAccountCircle,
    MdHome,
    MdAssignment,
    MdExitToApp,
    MdSettings,
    MdList,
  } = useIcons();
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <div
      className={
        checked
          ? `${styles.sidebar} ${styles.dark}`
          : `${styles.sidebar} ${styles.light}`
      }
    >
      <Link href="/profile">
        {user?.avatarUrl === " " ? (
          <MdAccountCircle size={192} color="#fff" />
        ) : (
          <Image
            src={user?.avatarUrl as string}
            height={160}
            width={160}
            alt="Imagem do usuário"
          />
        )}
      </Link>

      <MdList
        size={50}
        onClick={() => setDisplayMenu(!displayMenu)}
        color="#fff"
      />

      <ul
        className={
          displayMenu ? styles.menu : `${styles.menu} ${styles.menuChecked}`
        }
      >
        <Link className={styles.groupLink} href="/dashboard">
          <MdHome size={42} />
          <span>Tela Inicial</span>
        </Link>
        <Link className={styles.groupLink} href="/publications">
          <MdAssignment size={42} />
          <span>Publicações</span>
        </Link>
        <Link className={styles.groupLink} href="/profile">
          <MdSettings size={42} />
          <span>Perfil</span>
        </Link>
        <Link href="/" className={styles.groupLink} onClick={logout}>
          <MdExitToApp size={42} />
          <span>Sair</span>
        </Link>
      </ul>
    </div>
  );
}
