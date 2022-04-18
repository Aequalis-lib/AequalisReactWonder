# Web3-React
- Create a application using create-react-app  
  `npx create-react-app myapp`

- Create a simple UI layout for working.  

    1.connect btn.  
    2.Wallet list modal based on current network.

- Install web3-react core package.  

    ```
    npm i @web3-react/core
    ```
- Install ethersproject.
<br/>
    > you can use ethersprojuct. Ethers projuct is mandatory for web3-react
  ```javascript
  npm i @ethersproject/providers @ethersproject/units @web3-react/authereum-connector
  ```
  <br/>
- Install necessary Connectors.

   ``` javascript
    npm i @web3-react/injected-connector @web3-react/walletconnect-connector @web3-react/walletlink-connector @web3-react/fortmatic-connector
   ```
    
    1.injected - metamask  
    2.walletLInk - coinbase  
    3.walletconnect - walletconnect  
    4.fortmatic - fortmatic  
    
- Create a provider for web3React in App.js.
    ```javascript
    import { Web3ReactProvider} from "@web3-react/core";
    import { Web3Provider } from "@ethersproject/providers";


    function getLibrary(provider) {
        const library = new Web3Provider(provider);
        return library;
    }

    <Web3ReactProvider getLibrary={getLibrary}>
        <MyComponent />
    </Web3ReactProvider>
    ```
- Create a file connectors.js for store all connectors.  

    save below code in connectors file.

    ``` javascript
    import { FortmaticConnector } from "@web3-react/fortmatic-connector";
    import { InjectedConnector } from "@web3-react/injected-connector";
    import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
    import { WalletLinkConnector } from "@web3-react/walletlink-connector";
    
    const RPC_URLS = {
        1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
        4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213"
    };

    export const Injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42, 56, 137],
    });

    export const fortmatic = new FortmaticConnector({
        apiKey: "enter your api key here",
        chainId: 4,
    });

    export const walletconnect = new WalletConnectConnector({
        infuraId: "Infura ID",
        qrcode: true,
    });

   export const walletconnect = new WalletConnectConnector({
        rpc: RPC_URLS,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
        pollingInterval: 12000
    });
    ```    

- Create a hook.js for connecting wallet.
    - you can use some methods and values from useWeb3React hook.  

    ```javascript
    import { useState, useEffect } from "react";
    import { useWeb3React } from "@web3-react/core";

    import { injected } from "./connectors";
    ```

    Connect Wallet Hook : 
    ```javascript
    export function useEagerConnect() {
        const { activate, active } = useWeb3React();
        const [tried, setTried] = useState(false);

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
            activate(injected, undefined, true).catch(() => {
            setTried(true);
            });
        } else {
            setTried(true);
        }
        });
    }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
        setTried(true);
        }
    }, [tried, active]);

    return tried;
    }
    ```
    Disconnect Wallet Hook : 

    ```javascript
    export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React();

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleChainChanged = (chainId) => {
            console.log("chainChanged", chainId);
            activate(injected);
        };

        const handleAccountsChanged = (accounts) => {
            console.log("accountsChanged", accounts);
            if (accounts.length > 0) {
                activate(injected);
            }
        };

        const handleNetworkChanged = (networkId) => {
            console.log("networkChanged", networkId);
            activate(injected);
        };

        ethereum.on("chainChanged", handleChainChanged);
        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("networkChanged", handleNetworkChanged);

        return () => {
            if (ethereum.removeListener) {
            ethereum.removeListener("chainChanged", handleChainChanged);
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
            ethereum.removeListener("networkChanged", handleNetworkChanged);
            }
          };
        }

        return () => {};
      }, [active, error, suppress, activate]);
   }
    ```
    above function will activate that wallet. Then you can get datas from useWeb3React Hook or context. 
    use deactivate function for Disconnect wallet.
<br/>

- Create a myComponant.js for connecting wallet ui.
   -imports:
    
   ```javascript
    import React from "react";
    import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
    import { NoEthereumProviderError,UserRejectedRequestError as UserRejectedRequestErrorInjected} from "@web3-react/injected-connector";
    import { URI_AVAILABLE,UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
    import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
    import { formatEther } from "@ethersproject/units";

    import { injected, walletconnect } from "./connectors";
    import { useEagerConnect, useInactiveListener } from "./hooks";
   ```
    - Error message Function :

   ```javascript
    export function getErrorMessage(error) {
        if (error instanceof NoEthereumProviderError) {
            return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
        } else if (error instanceof UnsupportedChainIdError) {
            return "You're connected to an unsupported network.";
        } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect ||
            error instanceof UserRejectedRequestErrorFrame
        ) {
            return "Please authorize this website to access your Ethereum account.";
        } else {
            console.error(error);
            return "An unknown error occurred. Check the console for more details.";
        }
    }
   ```
    connectors store const variable:

   ```javascript
    export const connectorsByName = {
        Injected: injected,
        WalletConnect: walletconnect,
    };
   ```
    connectors store const variable:
    
   ```javascript

    const MyComponent = () => {
        const context = useWeb3React();
        const { connector, library, chainId, account, activate, deactivate, active, error } = context;

        // handle logic to recognize the connector currently being activated
        const [activatingConnector, setActivatingConnector] = React.useState();
        React.useEffect(() => {
            console.log("running");
            if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
            }
        }, [activatingConnector, connector]);

        // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
        const triedEager = useEagerConnect();

        // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
        useInactiveListener(!triedEager || !!activatingConnector);


        // fetch eth balance of the connected account
        const [ethBalance, setEthBalance] = React.useState();
        React.useEffect(() => {
            console.log("running");
            if (library && account) {
                let stale = false;

                library
                .getBalance(account)
                .then((balance) => {
                    if (!stale) {
                        setEthBalance(balance);
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setEthBalance(null);
                    }
                });

                return () => {
                    stale = true;
                    setEthBalance(undefined);
                };
            }
        }, [library, account, chainId]);

        // log the walletconnect URI
        React.useEffect(() => {
            console.log("running");
            const logURI = (uri) => {
            console.log("WalletConnect URI", uri);
            };
            walletconnect.on(URI_AVAILABLE, logURI);

            return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
            };
        }, []);

        return (
            <div style={{ padding: "1rem" }}>
            <h1 style={{ margin: "0", textAlign: "right" }}>
                {active ? "🟢" : error ? "🔴" : "🟠"}
            </h1>
            <h3 style={{ display: "grid",gridGap: "1rem",gridTemplateColumns: "1fr min-content 1fr", maxWidth: "20rem",lineHeight: "2rem", margin: "auto" }}
            >
                <span>Chain Id</span>
                <span role="img" aria-label="chain">⛓</span>
                <span>{chainId === undefined ? "..." : chainId}</span>

                <span>Account</span>
                <span role="img" aria-label="robot">🤖</span>
                <span>
                {account === undefined
                    ? "..."
                    : account === null
                    ? "None"
                    : `${account.substring(0, 6)}...${account.substring(
                        account.length - 4
                    )}`}
                </span>

                <span>Balance</span>
                <span role="img" aria-label="gold">
                💰
                </span>
                <span>
                {ethBalance === undefined ? "..."
                    : ethBalance === null ? "Error"
                    : `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
                </span>
            </h3>
            <hr style={{ margin: "2rem" }} />
            <div style={{ display: "grid",gridGap: "1rem",gridTemplateColumns: "1fr 1fr",maxWidth: "20rem",margin: "auto" }}
            >
                {Object.keys(connectorsByName).map((name) => {
                const currentConnector = connectorsByName[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled =
                    !triedEager || !!activatingConnector || connected || !!error;

                return (
                    <button style={{ height: "3rem",borderRadius: "1rem", borderColor: activating ? "orange": connected ? "green" : "unset",cursor: disabled ? "unset" : "pointer",position: "relative"}}
                    disabled={disabled}
                    key={name}
                    onClick={() => {
                        setActivatingConnector(currentConnector);
                        activate(connectorsByName[name]);
                    }}
                    >
                    <div style={{position: "absolute",top: "0", left: "0",height: "100%",display: "flex", alignItems: "center",color: "black",margin: "0 0 0 1rem"}}
                    >
                        {activating && <p>loading...</p>}
                        {connected && (
                        <span role="img" aria-label="check">✅</span>
                        )}
                    </div>
                    {name}
                    </button>
                );
                })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}
            >
                {(active || error) && (
                <button style={{ height: "3rem", marginTop: "2rem", borderRadius: "1rem", borderColor: "red", cursor: "pointer" }}
                    onClick={() => {
                    deactivate();
                    }}
                >
                    Deactivate
                </button>
                )}

                {!!error && (
                <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
                    {getErrorMessage(error)}
                </h4>
                )}
            </div>

            <hr style={{ margin: "2rem" }} />

            <div style={{ display: "grid", gridGap: "1rem", gridTemplateColumns: "fit-content", maxWidth: "20rem", margin: "auto" }}
            >
                {connector === walletconnect && (
                <button style={{ height: "3rem", borderRadius: "1rem", cursor: "pointer"}}
                    onClick={() => {
                    connector.close();
                    }}
                >
                    Kill WalletConnect Session
                </button>
                )}
            </div>
        </div>
      );
    };

    export default MyComponent;
   ```

## Reference :

[MetamaskDocs](https://docs.metamask.io/guide/#why-metamask)  
[Web3Docs](https://web3js.readthedocs.io/en/v1.5.2/index.html)  
[codesandbox](https://codesandbox.io/s/8rg3h)  
[blog](https://medium.com/coinmonks/web3-react-connect-users-to-metamask-or-any-wallet-from-your-frontend-241fd538ed39)  
[web3-react(npm)](https://www.npmjs.com/package/web3-react)  
[we3-react(github)](https://github.com/NoahZinsmeister/web3-react)


### Question:
- create a sample application for wallet connectivity and show the wallet address and balance in the home page?

### FAQ:
