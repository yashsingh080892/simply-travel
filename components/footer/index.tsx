import { useRouter } from 'next/router';

const Footer = () => {
    const { asPath } = useRouter();
    if(asPath.endsWith("login")){
        return null;
    } else {
        return (
            <footer>
                <div className="sm:container m-auto">
                    <p>Footer</p>
                </div>
            </footer>
        )
    }
}

export default Footer
