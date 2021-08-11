import React, { useCallback, useRef, useState } from 'react';
import {Page, Card, Layout, Button, TextField, TextContainer, Banner, Link, FooterHelp} from "@shopify/polaris";
import {useRouter} from "next/router";

const ActiveSubscriptions = () => {
    const router = new useRouter();
    const [textFieldValue, setTextFieldValue] = useState('');
    const node = useRef(null);

    const handleTextFieldChange = useCallback(
        (value) => setTextFieldValue(value),
        [],
    );

    const handleClick = useCallback(() => {
        node.current && node.current.input.focus();
    }, []);


    const handleFocus = useCallback(() => {
        if (node.current == null) {
            return;
        }
        node.current.input.select();
        document.execCommand('copy');
    }, []);

    return (
            <Page breadcrumbs={[{
                content: 'Back', onAction() {
                    router.push('/')
                }
            }]}
                  title="Back Home">
                <Layout>
                    <div style={{margin: 25, width: "100%"}}>
                        <Card title="API Installation" sectioned>
                            <TextContainer>
                                <Banner>
                                    <p>
                                        Use your generated API from Fit&Shop to gain access to our features.{' '}
                                        <FooterHelp>
                                            You don't have API yet.{' '}
                                            <Link external url="https://app.fitandshop.me">
                                                Visit Fit&Shop
                                            </Link>
                                        </FooterHelp>
                                    </p>
                                </Banner>
                            </TextContainer>

                            <div style={{marginTop: 25}}
                            >
                                <TextField
                                    ref={node}
                                    label="Fit&Shop API"
                                    onFocus={handleFocus}
                                    value={textFieldValue}
                                    onChange={handleTextFieldChange}
                                    connectedRight={
                                        <Button primary onClick={handleClick}>
                                            Install
                                        </Button>
                                    }
                                    placeholder="Enter generated API"
                                />
                            </div>
                        </Card>

                    </div>
                </Layout>
            </Page>
    );
};

export default ActiveSubscriptions;
