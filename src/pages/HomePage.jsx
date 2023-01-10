import style from "../style";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import useMobile from "../layout/Responsive";
import BlogPostHolder from "../layout/BlogPostHolder";
import householdBaseline from "../images/home/householdBaseline.png";
import policyImpact from "../images/home/policyImpact.png";
import policyScore from "../images/home/policyScore.png";
import gtag from "../api/analytics";
import { Carousel } from "antd";

import RobertColvile from "../images/headshots/robert-colvile.jpeg";
import SimonDuffy from "../images/headshots/simon-duffy.jpeg";
import MartinFarley from "../images/headshots/martin-farley.jpeg";
import TorrinWilkins from "../images/headshots/torrin-wilkins.webp";

import Centre from "../images/logos/orgs/centre.webp";
import CPS from "../images/logos/orgs/cps.png";
import GPEW from "../images/logos/orgs/gpew.png";
import LiberalParty from "../images/logos/orgs/liberal-party.png";
import SMF from "../images/logos/orgs/smf.png";
import UBICenter from "../images/logos/orgs/ubicenter.png";
import UBILabs from "../images/logos/orgs/ubilabs.png";
import UKEU from "../images/logos/orgs/ukeu.svg";

function HouseholdPolicyOptions(props) {
  const { countryId } = props;
  const navigate = useNavigate();
  const mobile = useMobile();

  const boxWidth = 300;

  return (
    <div
      style={{
        paddingTop: 20,
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: "center",
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <motion.div
        style={{
          width: boxWidth,
          height: boxWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          padding: 20,
          cursor: "pointer",
          marginRight: mobile ? 0 : 20,
          marginBottom: mobile ? 20 : 0,
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          navigate(`/${countryId}/household`);
          gtag("event", "navigate", {
            event_category: "home",
            event_label: "Home -> Household",
          });
        }}
      >
        <h2>Compute my household income</h2>
        <p>
          Use PolicyEngine to calculate your taxes and benefits, and explore how
          they'd change under different scenarios and policies.
        </p>
      </motion.div>
      <motion.div
        style={{
          width: boxWidth,
          height: boxWidth,
          backgroundColor: style.colors.LIGHT_GRAY,
          padding: 20,
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          navigate(`/${countryId}/policy`);
          gtag("event", "navigate", {
            event_category: "home",
            event_label: "Home -> Policy",
          });
        }}
      >
        <h2>Compute the impact of policy reforms</h2>
        <p>
          Use PolicyEngine to calculate your taxes and benefits, and explore how
          they'd change under different scenarios and policies.
        </p>
      </motion.div>
    </div>
  );
}

function WidePanelHalf(props) {
  const { direction, children } = props;
  return (
    <motion.div
      style={{
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
        width: "100%",
        height: "100%",
      }}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

export function WidePanel(props) {
  const { left, right, direction, backgroundColor } = props;
  const mobile = useMobile();

  if (mobile) {
    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          marginTop: 25,
          marginBottom: 25,
          overflowX: "hidden",
        }}
      >
        <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
          <WidePanelHalf direction={direction}>{left}</WidePanelHalf>
          <WidePanelHalf direction={direction}>{right}</WidePanelHalf>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        height: !mobile && 600,
        marginTop: 25,
        marginBottom: 25,
      }}
    >
      <Container style={{ paddingTop: 100, paddingBottom: 100 }}>
        <Row>
          <Col>
            <WidePanelHalf direction={direction}>{left}</WidePanelHalf>
          </Col>
          <Col>
            <WidePanelHalf direction={direction}>{right}</WidePanelHalf>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function HomePage(props) {
  const { countryId } = props;
  const mobile = useMobile();
  // Items are centered horizontally, and placed in order vertically.
  return (
    <>
      <div
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 70,
          display: "flex",
          flexDirection: "column",
          alignItems: !mobile && "center",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <h1>We compute the impact of public policy.</h1>
          <h4>
            PolicyEngine's free, open-source software turns law into code.
          </h4>
        </div>
        <HouseholdPolicyOptions countryId={countryId} />
      </div>
      <BlogPostHolder countryId={countryId} />
      <Collaborations countryId={countryId} />
      <WidePanel
        direction="right"
        backgroundColor={style.colors.WHITE}
        right={
          <>
            <h1 style={{ paddingBottom: 30 }}>
              Simulate the full tax-benefit system on any household
            </h1>
            <h5>
              Our free and open-source models describe a country's tax and
              benefit laws. Describe a household's characteristics and instantly
              compute their taxes, benefits, marginal tax rates and more.
            </h5>
          </>
        }
        left={
          <img
            src={householdBaseline}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Household baseline"
          />
        }
      />
      <WidePanel
        direction="left"
        backgroundColor={style.colors.LIGHT_GRAY}
        left={
          <>
            <h1 style={{ paddingBottom: 30 }}>Design custom policy reforms</h1>
            <h5>
              Our free and open-source models describe a country's tax and
              benefit laws. Describe a household's characteristics and instantly
              compute their taxes, benefits, marginal tax rates and more.
            </h5>
          </>
        }
        right={
          <img
            src={policyScore}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Policy score"
          />
        }
      />
      <WidePanel
        direction="right"
        backgroundColor={style.colors.WHITE}
        right={
          <>
            <h1 style={{ paddingBottom: 30 }}>
              See how reforms affect households
            </h1>
            <h5>
              Our free and open-source models describe a country's tax and
              benefit laws. Describe a household's characteristics and instantly
              compute their taxes, benefits, marginal tax rates and more.
            </h5>
          </>
        }
        left={
          <img
            src={policyImpact}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt="Policy impact"
          />
        }
      />
    </>
  );
}

function Collaborations(props) {
  const { countryId } = props;

  const quoteData = {
    uk: [
      {
        name: "Robert Colvile",
        position: "Director of the Centre for Policy Studies",
        quote: "PolicyEngine has been a really valuable addition to the UK policy space, democratising access to economic modelling and making it easier than ever to apply actual numbers to the policy debate.",
        headshot: RobertColvile,
      },
      {
        name: "Martin Farley",
        position: "Convener of the Green Party's Tax and Fiscal Policy Working Group",
        quote: "PolicyEngine has transformed the Green Party's ability to measure and understand the impact of its policy platform in a way that seemed impossible before. Its ability to process complex data and turn it into policy outcomes brings clarity and direction to policies at a stroke. An amazing tool that should be used in all discussions about policy in the future.",
        headshot: MartinFarley,
      },
      {
        name: "Dr Simon Duffy",
        position: "Director of Citizen Network Research",
        quote: "PolicyEngine is exactly what the world of policy-making needs today. For too long policy on tax and benefits has been lost in a fog of confusion and misleading rhetoric. To have democratic conversations about tax and benefits we need to look the overall picture and see what policies will mean for individuals and families. Policy Engine pulls back the curtain on tax and benefits and helps us find the courage to introduce real reforms.",
        headshot: SimonDuffy,
      },
      {
        name: "Torrin Wilkins",
        position: "Director and Founder of Centre Think Tank",
        quote: "Policy Engine is an incredible tool for think tanks, policy makers and anyone who wants to understand the impact of policy decisions. It has been invaluable for Centre Think Tank when writing reports and has allowed us to propose new policies with ease whilst clearly breaking down the impacts on different groups. For us it has been a game changer.",
        headshot: TorrinWilkins,
      }
    ]
  }

  // eslint-disable-next-line
  const orgData = {
    uk: [
      UKEU,
      GPEW,
      LiberalParty,
      SMF,
      UBICenter,
      UBILabs,
      Centre,
      CPS,
    ]
  }
  const countryQuotes = quoteData[countryId] || [];
  if (countryQuotes.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: style.colors.WHITE,
        marginTop: 25,
        marginBottom: 25,
      }}
    >
      <Container style={{ paddingTop: 100 }}>
        <Row style={{paddingLeft: 300, paddingRight: 300}}>
          <Carousel autoplay>
            {countryQuotes.map(data => <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <p style={{fontFamily: "Merriweather", fontSize: 20, marginBottom: 50}}>{data.quote}</p>
              <div style={{display: "flex", justifyContent: "center"}}>
                <img 
                  src={data.headshot} 
                  alt={`${data.name} headshot`}
                  style={{
                    width: 100, height: 100, borderRadius: 50, marginBottom: 20,
                    objectFit: "cover"
                  }}
                />
              </div>
              <h6 style={{textAlign: "center"}}><b>{data.name}</b></h6>
              <h6 style={{textAlign: "center", marginBottom: 50}}>{data.position}</h6>
            </div>)}
          </Carousel>
        </Row>
      </Container>
    </div>
  );
}