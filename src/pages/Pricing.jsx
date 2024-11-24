import MainNav from "../components/MainNav";
import styles from "./Pricing.module.css";

function Pricing() {
    return (
        <main className={styles.pricing}>
            <MainNav/>
            <section>
                <div>
                    <h2>
                        <span>Simple pricing</span>
                        <span>Just 9$/month</span>
                    </h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vitae vel labore mollitia iusto. Recusandae
                        quos provident, laboriosam fugit voluptatem iste.
                    </p>
                </div>
                <img src="/src/assets/image-2.jpg" alt="a map with markers"/>
            </section>
        </main>
    );
}

export default Pricing;