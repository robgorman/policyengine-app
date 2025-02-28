import { Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../../controls/Button";

export default function PolicyImpactPopup(props) {
  const [needToOpenModal, setNeedToOpenModal] = useState(true);
  const {
    metadata,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  } = props;
  const content = (
    <div>
      <div>
        {metadata.countryId === "us" ? (
          <p>
            PolicyEngine estimates reform impacts using a static microsimulation
            over the 2021 Current Population Survey March Supplement.{" "}
            <a href="/us/blog/2022-12-28-enhancing-the-current-population-survey-for-policy-analysis">
              Read our caveats and data enhancement plan.
            </a>
          </p>
        ) : (
          <p>
            PolicyEngine estimates reform impacts using a static microsimulation
            over{" "}
            <a href="/uk/blog/2022-03-07-how-machine-learning-tools-make-policyengine-more-accurate">
              an enhanced version of the 2019 Family Resources Survey
            </a>
          </p>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          primary
          onClick={() => Modal.destroyAll()}
          text="See the results"
        />
      </div>
    </div>
  );
  useEffect(() => {
    const openModal = () => {
      Modal.info({
        title:
          "PolicyEngine simulates your reform over thousands of households",
        content: content,
        style: {
          borderRadius: 25,
        },
        okButtonProps: {
          style: {
            display: "none",
          },
        },
        keyboard: true,
        centered: true,
      });
    };
    if (needToOpenModal && !hasShownPopulationImpactPopup) {
      openModal();
      setNeedToOpenModal(false);
      setHasShownPopulationImpactPopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    needToOpenModal,
    metadata,
    hasShownPopulationImpactPopup,
    setHasShownPopulationImpactPopup,
  ]);
  return null;
}
