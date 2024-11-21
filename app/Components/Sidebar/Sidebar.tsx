"use client";
import { useGlobalState } from '@/app/context/GlobalProvider'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import menu from '@/app/utils/menu'
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, useClerk, UserButton, useUser } from '@clerk/nextjs';
import Button from '../Button/Button';
import { bars, logout } from '@/app/utils/icons';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Sidebar() {
    const { theme, isSidebarCollapsed, toggleSidebar, toggleLightMode, selectedTheme } = useGlobalState();
    const { signOut } = useClerk();
    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useAuth();

    const { user } = useUser();
    const { firstName, lastName } = user || {
        firstName: '',
        lastName: ''
    };


    const handleClick = (link: string) => { router.push(link); };

    if (!userId) return null;

    return (
        <SidebarStyled theme={theme} collapsed={isSidebarCollapsed}>
            <button onClick={toggleSidebar} className="toggle-sidebar">{bars}</button>
            <div className="profile">
                <div className="profile-overlay"></div>
                <div className="profile-image">
                    <UserButton />
                </div>
                <h1>
                    {firstName} {lastName}
                </h1>

            </div>
            <ul className="nav-items">
                {menu.map((item) => {
                    const link = item.link;
                    return (
                        <li
                            key={item.id}
                            className={`nav-item ${pathname === link ? 'active' : ''}`}
                            onClick={() => handleClick(link)}
                        >
                            {item.icon}
                            <Link href={link}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div>
                <div className="toggle-lightmode relative m-2">
                    <h2>Cookie Theme</h2>
                    <ToggleSwitch value={(selectedTheme === 1).toString()} onChange={() => {
                        toggleLightMode();
                    }} />
                </div>
                <div className="sign-out relative mb-4 mx-6">
                    <Button
                        name="Sign Out"
                        type="submit"
                        padding="0.5rem 1rem"
                        borderRad="0.8rem"
                        fw="500"
                        fs="1rem"
                        icon={logout}
                        click={() => signOut(() => router.push('/signin'))}
                    />
                </div>
                <div className='flex flex-col items-center pb-5'>
                    <div className='text-sm font-medium text-gray-400'>
                        Made by Ömür Bilgin
                    </div>
                    <div className='flex gap-2'>
                        <Link href='https://github.com/trojenM' className='text-sm font-medium text-gray-200 hover:text-gray-200 ease-in-out transition-all duration-300' >Github &#8599;</Link>
                        <Link href='https://www.linkedin.com/in/omurbilgin/' className='text-sm font-medium text-gray-200 hover:text-gray-200 ease-in-out transition-all duration-300' >LinkedIn &#8599;</Link>
                    </div>
                </div>
            </div>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
    position: relative;
    width: ${props => props.theme.sidebarWidth};
    background-color: ${props => props.theme.colorBg2};
    border: 2px solid ${props => props.theme.borderColor2};
    border-radius: 1rem;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: all 0.3s ease-in-out;

    color: ${props => props.theme.colorGrey3};

    @media screen and (max-width: 768px) {
        position: fixed;   
        z-index: 100;
        height: calc(100vh - 2rem);
        width: calc(${props => props.theme.sidebarWidth} - 3rem);
        transform: ${props => props.collapsed ? 'translateX(-107%)' : 'translateX(0)'};

        .toggle-sidebar {
            display: block !important;
        }
    }

    .toggle-sidebar {
        display: none;
        position: absolute;
        right: -33px;
        top: 3rem;
        padding: 0.7rem 0.6rem;

        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;

        border-right: 2px solid ${props => props.theme.borderColor3};
        border-top: 2px solid ${props => props.theme.borderColor3};
        border-bottom: 2px solid ${props => props.theme.borderColor3};

        background-color: ${props => props.theme.colorBg2};
        color: ${props => props.theme.colorGrey1};

        cursor: pointer;
    }

    .profile {
        margin: 1.5rem;
        padding: 1rem, 0.8rem;
        position: relative;

        border-radius: 1rem;

        font-weight: 500;
        color: ${props => props.theme.colorGrey0};

        display: flex;
        align-items: center;

        .profile-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        z-index: 0;
        background: ${props => props.theme.colorBg3};
        transition: all 0.55s linear;
        border-radius: 1rem;
        border: 2px solid ${props => props.theme.borderColor2};
        opacity: 0.7;
        } 

        .cl-userButton-root {
            .cl-avatarBox {
                width: 70px;
                height: 70px; 
            }
        }

        h1 {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-left: 0.8rem;

            line-height: 1.2rem;
        }

        .profile-image, h1 {
            position: relative;
            z-index: 1;
        }

        .profile-image {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            transition: all 0.5s ease;
            border-radius: 100%;
            padding: 0.5rem;

            width: 70px;
            height: 70px;

            img {
                border-radius: 100%;
                transition: all 0.5s ease;
            }
        }

        &:hover {
            .profile-overlay {
                opacity: 1;
                border: 2px solid ${props => props.theme.borderColor2};
            }

            img {
                transform: scale(1.1);
            }
        }
    }

    .nav-item {
        position: relative;
        padding: 0.6rem 1rem;
        padding-left: 2.1rem;
        margin: 0.3rem 0;

        display: grid;
        grid-template-columns: 40px 1fr;
        cursor: pointer;

        color: ${props => props.theme.colorGrey1};

        &::after {
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            width: 0;
            height: 100%;
            background-color: ${props => props.theme.activeNavLinkHover};
            z-index: 1;
            transition: all 0.3s ease-in-out;
        }

        &::before {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            width: 0;
            height: 100%;
            background-color: ${props => props.theme.colorGrey1};
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
        }

        &:hover {
            &::after {
                width: 100%;
            }
        }
    }

    .active {
        background-color: ${props => props.theme.activeNavLink};

        i, a {
            color: ${props => props.theme.colorGrey0};
        }

        &::before {
            width: 0.3rem;
        }
    }

    .toggle-lightmode {
        display: flex;
        justify-content: center;
        align-items: center;

        h2 {
            font-size: 0.9rem;
            font-weight: 600;
            color: ${props => props.theme.colorGrey1};
        }
    }
`;

export default Sidebar
