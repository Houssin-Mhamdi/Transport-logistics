"use client";

import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";
import { email } from "@/lib/constants";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-surface-container-low">
            <TopNavBar />

            {/* Header Section */}
            <section className="pt-32 pb-16 bg-surface">
                <div className="max-w-4xl mx-auto px-8">
                    <span className="text-secondary font-label text-sm font-bold tracking-[0.2em] mb-4 block">DATA PROTECTION</span>
                    <h1 className="text-primary font-headline text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
                        Privacy Policy
                    </h1>
                    <p className="text-on-surface-variant text-lg leading-relaxed">
                        Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-8">
                    <div className=" dark:bg-slate-900 rounded-3xl p-8 md:p-12   space-y-8 text-on-surface-variant">
                        
                        <div>
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Information We Collect</h2>
                            <p className="leading-relaxed mb-4">
                                At Transpro Logistics, we respect your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
                            </p>
                            <p className="leading-relaxed mb-2">
                                <strong>Personal Data:</strong> We may collect personal identification information such as your name, email address, phone number, and billing/shipping addresses when you create an account, request a quote, or book a shipment.
                            </p>
                            <p className="leading-relaxed">
                                <strong>Operational Data:</strong> We also collect data related to your shipments, including cargo details, routing preferences, and tracking information to fulfill our logistical operations.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">2. How We Use Your Data</h2>
                            <ul className="list-disc list-inside space-y-2 leading-relaxed ml-4">
                                <li><strong>Service Execution:</strong> To process bookings, generate invoices, and handle the physical transport of your goods.</li>
                                <li><strong>Communication:</strong> To provide tracking updates, customer support, and necessary operational notifications.</li>
                                <li><strong>Improvement:</strong> To analyze our website performance, optimize routes, and improve the user experience for our digital platforms.</li>
                                <li><strong>Compliance:</strong> To meet legal, regulatory, and customs requirements related to international freight.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">3. Data Sharing and Third Parties</h2>
                            <p className="leading-relaxed">
                                Transpro Logistics does not sell your personal data. However, to execute global logistical operations, we must share relevant shipment data strictly on a need-to-know basis with trusted third-party partners. This includes customs authorities, partner transport carriers, port operators, and our secure payment gateways (e.g., Stripe, PayPal). All third-party providers are vetted for strict compliance with modern data protection standards.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">4. Data Security</h2>
                            <p className="leading-relaxed">
                                We implement state-of-the-art security measures to prevent your personal data from being accidentally lost, used, accessed in an unauthorized way, altered, or disclosed. All digital transactions and data transmissions via our platforms are secured by industry-standard SSL encryption protocols.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">5. Your Rights</h2>
                            <p className="leading-relaxed mb-4">
                                Under the GDPR, you have the right to request access to, correction of, or erasure of your personal data. You may also object to the processing of your data or request the transfer of your data to another party.
                            </p>
                            <p className="leading-relaxed">
                                To exercise these rights or if you have any questions regarding how we handle your data, please contact our Data Protection Officer at <strong>{email}</strong>.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
