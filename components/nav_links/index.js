import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import commaNumber from 'comma-number';
import Icon from '../icon';

const NavLinks = ({ links, onClick }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isActivePath = (pathname) => {
        if (pathname === "/") {
            return router.pathname === pathname;
        } else {
            return router.pathname.includes(pathname);
        }
    };

    const renderLink = (link, i) => {
        switch (link.url) {
            case "divider":
                return (
                    <span
                        key={i}
                        className={classNames("nav-link-container", {
                            "divider": true,
                            "bold": link.url == "divider"
                        })}
                    >{link.name}</span>
                )
            case "line":
                return (
                    <span
                        key={link.url}
                        className={classNames({
                            "line-divider": true,
                        })}
                    >{link.name}</span>
                )
            default:
                return (
                    <li key={link.url} className={classNames("nav-link-container transition-element", {
                        "nav-link-active": isActivePath(link.url)
                    })}
                    >
                        <div className="link-wrapper">
                            <Link
                                href={link.url}
                                onClick={()=> onClick && onClick()}
                            >
                                <div className="nav-link">
                                    <div className="nav-link-left">
                                        {link.icon && <Icon name={link.icon} />}
                                        <span
                                            className={classNames( {
                                                "nav-link-label": true,
                                                "bold": link.url == "divider"
                                            })}
                                        >{link.name}</span>

                                    </div>
                                </div>

                                {link.number && <span className="nav-link-number">{link.number}</span>}


                            </Link>

                        </div>
                    </li>)
        }
    };

    const format = commaNumber.bindWith(',', '.');

    return (
        <div className="nav-links-container">
            <ul
                className={classNames({ "active": !(router.pathname === "/") }, "nav-links")}
            >
                {links.map((link, i) => renderLink(link, i))}
            </ul>
        </div>
    );
};

export default NavLinks;
