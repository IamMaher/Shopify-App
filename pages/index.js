import React from "react";
import { useRouter } from "next/router";
import { Page, Card } from "@shopify/polaris";

const Index = () => {
  const router = useRouter();
  return (
    <Page>
      <Card
        title="API Installation"
        sectioned
        primaryFooterAction={{
          content: "API Installation",
          onAction: () => {
            router.push("/activeSubscriptions");
          },
        }}
      >
        <p>Check subscriptions to get started.</p>
      </Card>
      <Card
        title="Code Injection"
        sectioned
        primaryFooterAction={{
          content: "Code Injection",
          onAction: () => {
            router.push("/codeManagement");
          },
        }}
      >
        <p>Manage script tags and other code installations.</p>
      </Card>
    </Page>
  );
};

export default Index;
