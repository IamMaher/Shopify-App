import React from "react";
import {useRouter} from "next/router";
import {Page, SettingToggle, TextStyle, Layout, Card, Button, Banner, FooterHelp, Link, TextContainer} from "@shopify/polaris";
import gql from "graphql-tag";
import {useQuery, useMutation} from "react-apollo";

const GET_SCRIPT_TAG = gql`
  query getScriptTag($src: URL){
    scriptTags(first : 10, src : $src){
      edges {
        node {
          src,
          id
        }
      }
    }
  }
`;

const CREATE_SCRIPT_TAG = gql`
  mutation createScriptTag($input: ScriptTagInput!){
    scriptTagCreate(input : $input){
      scriptTag {
        src,
        id
      }
      userErrors{
        message
      }
    }
  }
`;

const DELETE_SCRIPT_TAG = gql`
  mutation deleteScriptTag($id: ID!){
    scriptTagDelete(id : $id){
      deletedScriptTagId
      userErrors{
        message
      }
    }
  }
`;

const initialState = {
    isInstall: false,
    isLoading: false,
    isError: "",
    script: "https://shopify-fit-shop.loca.lt/script-fit-shop.js",
    event: "onload",
    installedScript: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INSTALL_SUCCESS":
            return {
                ...state,
                isInstall: true,
                isLoading: false,
                isError: "",
                installedScript: action.payload,
            };
        case "INSTALL_FAIL":
            return {
                ...state,
                isInstall: false,
                isLoading: false,
                isError: action.payload,
            };
        case "INSTALL_LOADING":
            return {
                ...state,
                isLoading: true,
                isError: "",
            };
        case "UNINSTALL_SUCCESS":
            return {
                ...state,
                isInstall: false,
                isLoading: false,
                isError: "",
                installedScript: null,
            };
        case "UNINSTALL_FAIL":
            return {
                ...state,
                isInstall: true,
                isLoading: false,
                isError: action.payload,
            };
        default:
            return state;
    }
};
const installLoading = () => ({type: "INSTALL_LOADING"});
const installSuccess = (script) => ({
    type: "INSTALL_SUCCESS",
    payload: script,
});
const installFail = (error) => ({type: "INSTALL_FAIL", payload: error});
const uninstallSuccess = () => ({type: "UNINSTALL_SUCCESS"});
const uninstallFail = (error) => ({type: "UNINSTALL_FAIL", payload: error});


const CodeManagement = () => {
    const router = useRouter();
    const [featureScript, dispatch] = React.useReducer(reducer, initialState);
    // Handle get public tag logic
    const {loading, error} = useQuery(GET_SCRIPT_TAG, {
        variables: {src: featureScript.script},
        onCompleted: data => {
            console.log("Get public tag", data);
            let getScriptTagData = data.scriptTags.edges;
            if (getScriptTagData.length) {
                dispatch(installSuccess(getScriptTagData[0].node));
            }
        }
    });

    // Handle Create public tag logic
    const [handleInstall, {loading: createLoading}] = useMutation(CREATE_SCRIPT_TAG, {
        variables: {input: {src: featureScript.script}},
        onCompleted: data => {
            console.log("Create public tag", data);
            let createScriptTagdata = data?.scriptTagCreate.scriptTag;
            let createScriptTagError = data?.scriptTagCreate.userErrors;
            if (createScriptTagdata) {
                dispatch(installSuccess(createScriptTagdata));
            } else if (createScriptTagError.length) {
                dispatch(installFail("Something is Wrong! Please try again."));
            }
        }
    })

    // Handle Delete public tag logic
    const [handleUninstall, {loading: deleteLoading}] = useMutation(DELETE_SCRIPT_TAG, {
        variables: {id: featureScript.installedScript?.id},
        onCompleted: data => {
            console.log("Delete public tag", data);
            let deleteScriptTagData = data?.scriptTagDelete.deletedScriptTagId;
            let deleteScriptTagError = data?.scriptTagDelete.userErrors;
            if (deleteScriptTagData != null) {
                dispatch(uninstallSuccess());
            } else if (deleteScriptTagError.length) {
                dispatch(uninstallFail(deleteScriptTagError.message));
            }
        }
    })

    const scriptTagToggle = featureScript.isInstall ? handleUninstall : handleInstall;
    const titleDescription = featureScript.isInstall ? "Uninstall" : "Install";
    const bodyDescription = featureScript.isInstall ? "Installed" : "Uninstalled";

    return (
        <React.Fragment>
            <Page breadcrumbs={[{
                content: 'Back', onAction() {
                    router.push('/')
                }
            }]}
                  title="Back Home">
                <Card title="Code Management" sectioned>
                    <TextContainer>
                        <Banner>
                            <p>
                                Use Fit&Shop Automated Integration And Get Started.{' '}
                                <FooterHelp>
                                    Manage installs and uninstalls, for more details.{' '}
                                    <Link external url="https://www.fitandshop.me/wiki/">
                                        Visit Fit&Shop Wiki
                                    </Link>
                                </FooterHelp>
                            </p>
                        </Banner>
                    </TextContainer>
                    <Layout.AnnotatedSection title={`${titleDescription} fit&shop`}>
                        <SettingToggle
                            action={{
                                content: titleDescription,
                                onAction: scriptTagToggle,
                                loading: loading || createLoading || deleteLoading,
                                disabled: loading || createLoading || deleteLoading,
                                destructive: !!featureScript.installedScript,
                            }}
                        >
                            {featureScript.isError ? (
                                <p>Something is wrong! Please try again</p>
                            ) : (
                                <p>
                                    The fit&shop script is{" "}
                                    <TextStyle variation="strong">{bodyDescription}</TextStyle>
                                </p>
                            )}
                        </SettingToggle>
                    </Layout.AnnotatedSection>
                </Card>
            </Page>
        </React.Fragment>

    );
};

export default CodeManagement;
