"use client";

import TopNavBar from "@/components/ui/TopNavBar";
import Footer from "@/components/ui/Footer";

export default function Terms() {
    return (
        <main className="min-h-screen bg-surface-container-low">
            <TopNavBar />

            {/* Header Section */}
            <section className="pt-32 pb-16 bg-surface">
                <div className="max-w-4xl mx-auto px-8">
                    <span className="text-secondary font-label text-sm font-bold tracking-[0.2em] mb-4 block">LEGAL NOTICES</span>
                    <h1 className="text-primary font-headline text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
                        Terms and Conditions
                    </h1>
                    <p className="text-on-surface-variant text-lg leading-relaxed">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-8">
                    <div className=" dark:bg-slate-900 rounded-3xl p-8 md:p-12  space-y-8 text-on-surface-variant">
                        
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
                            <p className="leading-relaxed">
                                Welcome to Transpro Logistics ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website and services.
                                By continuing to use our services, you agree to be bound by these terms. If you do not agree to these terms, please do not use our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">2. Services Scope</h2>
                            <p className="leading-relaxed">
                                Transpro Logistics provides comprehensive global transport, freight forwarding, and supply chain management services. The specifics of each service engagement are outlined in individual service agreements, quotations, and bills of lading. All timelines provided are estimates and are subject to customary logistical variables including weather, customs clearance, and global infrastructural factors.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">3. Booking and Quotations</h2>
                            <p className="leading-relaxed mb-4">
                                3.1 All quotations provided through our platform or by our agents are valid for 14 days unless otherwise specified in writing.
                            </p>
                            <p className="leading-relaxed">
                                3.2 Booking confirmations are subject to final weight and measurement verifications at the point of origin. We reserve the right to adjust final pricing if the actual shipment specifications materially differ from the booked parameters.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">4. Liability and Insurance</h2>
                            <p className="leading-relaxed">
                                While we maintain standard liability structures in accordance with international transport laws (such as the CMR Convention for road transport or Hague-Visby rules for sea transport), we strongly recommend that customers procure comprehensive cargo insurance for the full value of their shipments. We are not liable for indirect or consequential losses, loss of profit, or damages caused by force majeure events.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">5. Payment Terms</h2>
                            <p className="leading-relaxed mb-4">
                                5.1 Invoices are strictly payable within 30 days of the invoice date unless alternative credit terms have been formally agreed upon in writing.
                            </p>
                            <p className="leading-relaxed">
                                5.2 We reserve the right to assert a lien on cargo in our possession for unpaid freight and associated charges. Late payments may accrue interest at the prevailing statutory rate.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">6. Governing Law</h2>
                            <p className="leading-relaxed">
                                These Terms and Conditions are governed by and construed in accordance with the laws of Germany. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Germany.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
