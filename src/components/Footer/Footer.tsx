export type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="container mx-auto text-center">
      Source:{" "}
      <a
        target="_blank"
        className="underline text-blue-400"
        href="https://github.com/kevinantech/products-management"
      >
        github/kevinantech/products-management
      </a>
    </footer>
  );
};

export default Footer;
