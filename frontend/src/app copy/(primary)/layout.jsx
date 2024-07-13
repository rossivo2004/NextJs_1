import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

export default function PrimaryLayout({ children }) {
    return (
      <div className="bg-black">
      <Header />
          <main className="mt-20">{children}</main>
          <Footer />
      </div>
    );
  }