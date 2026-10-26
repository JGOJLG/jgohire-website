import type { NextConfig } from "next";

// Each branded link redirects directly to its own Amazon Attribution tag.
const nextConfig: NextConfig = {
  async redirects() {
    return [
    {
        "source": "/book/instagram-bio",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_B467C26C3901EBE77EE0D1D4BFACE19D_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/linkedin-posts",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_2551FCA597E763A437BAA78F2AF798E9_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/networking-events",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_981F2339966211D213BBEB262BD77621_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/general",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_0EC6D689A3B9B6C13E4242AC1227486C_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/direct-messages",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_0D08AC0A49B6DD64E032353A952DB03D_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/email-signature",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_EA0CC6E0AEC6EACC754AEC8BB694B691_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/newsletter",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_51D7F15DC586024F7A5A8E36566CA196_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/print-qr",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_8F140757DBCD4EA1A6B86CA55601910C_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/instagram-story",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_4FE3F74A75D55F0F9A1AE55736F29FD6_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/jgo-hire-website",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_70DEB960F43BBD78A4A0D4E02CC033CC_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/linkedin-proposals",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_FB7B78280693BA509FEF67E6F8FE927A_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/coaching-clients",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_6531AC3B69B2FDDDCC95803679B591F5_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/pinterest",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_B46B5F83DFBD42580EC4539095DBD106_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/tiktok-bio",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_C3606BB4AD60D3278C29D26C14985161_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/facebook",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_B984F1E656860296B95AEC4A6568F2CC_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/proposal",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_FB7B78280693BA509FEF67E6F8FE927A_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    },
    {
        "source": "/book/instagrambio",
        "destination": "https://www.amazon.com/dp/B0HL4GTJ5H?maas=maas_adg_B467C26C3901EBE77EE0D1D4BFACE19D_afap_abs&ref_=aa_maas&tag=maas",
        "permanent": false
    }
];
  },
};

export default nextConfig;
