import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react';
//Com o CloneElemente posso clonar o elemento chidren e passar um propriedade para ele

interface ActiveLinkProps extends LinkProps {
    children: ReactElement,
    activeClassName: string,
} 

export function ActiveLink({ children, activeClassName, ...rest}: ActiveLinkProps) {
    const { asPath } = useRouter();

    const className = asPath === rest.href
    ? activeClassName
    : '';

    return (
        <Link {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    )
}