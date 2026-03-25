import EditIcon from "../icons/EditIcon";

function PrivacySection() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-[16px] font-semibold mb-[18px]">Privacy Policy Editor</h2>
        <span className="cursor-pointer">
          {" "}
          <EditIcon />{" "}
        </span>
      </div>
      <h3 className="text-[24px] font-bold text-[#1a2b4b] mb-4">
        WordPress Privacy Policy: How to add a Privacy Policy to your WordPress
        site
      </h3>
      <p className="font-normal text-[16px] text-[#777980]">
        With privacy legislation being developed in regions around the globe,
        virtually every website is required to publish a Privacy Statement that
        describes their dealings with personal data. If you are using WordPress,
        publishing your Privacy Policy to your website has become relatively
        easy.
      </p>
      <br />
      <p className="font-normal text-[16px] text-[#777980]">
        When setting up a fresh WordPress installation, you might notice that
        WordPress includes a template for a basic Privacy Policy. It contains
        some essential headers and suggested texts, but as we’re not all
        lawyers, one would easily get confused and forget essential information
        that is legally required.
      </p>
      <br />
      <p className="font-normal text-[16px] text-[#777980]">
        Luckily, the strength of WordPress is that there is a plugin for almost
        every task. Before we developed Complianz, as webdevelopers we were
        facing the same issue that our clients needed a Privacy Policy, but were
        not prepared to hire legal council to draft this legal document. As a
        Privacy Policy should be tailored to your website, using a WordPress
        plugin is a convenient solution to draft a Privacy Policy and keep it
        up-to-date. For further information on what a Privacy Policy is and what
        it should contain, please refer to our dedicated article.
      </p>
    </div>
  );
}

export default PrivacySection;
