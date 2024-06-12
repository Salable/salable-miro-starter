import * as React from "react";
import { createRoot } from "react-dom/client";
import { getCheckoutLink, getGrantee } from "@salable/js";

import "../src/assets/style.css";
import { BoardInfo } from "@mirohq/websdk-types";

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: "Hello, World!",
  });

  await miro.board.viewport.zoomTo(stickyNote);
}

const App: React.FC = () => {
  const [checkoutLink, setCheckoutLink] = React.useState<string | null>(null);
  const [canAddSticky, setCanAddSticky] = React.useState(false);

  const apiKey = import.meta.env.VITE_SALABLE_API_KEY as string;

  const checkUserLicense = async (board: BoardInfo) => {
    const { hasCapability } = await getGrantee({
      apiKey,
      productUuid: import.meta.env.VITE_SALABLE_PRODUCT_UUID as string,
      granteeId: board.id,
    });

    setCanAddSticky(hasCapability("Create"));
    return hasCapability("pro");
  };

  const fetchCheckoutLink = async (boardInfo: BoardInfo) => {
    if (checkoutLink) return;

    const boardUrl = `https://miro.com/app/board/${boardInfo.id}/`;

    const url = await getCheckoutLink({
      apiKey,
      planUuid: import.meta.env.VITE_SALABLE_PLAN_UUID as string,
      // The grantee can be anything, in this case we've opted to have the
      // license belong to the board.
      granteeId: boardInfo.id,
      member: boardInfo.id,
      successUrl: boardUrl,
      cancelUrl: boardUrl,
    });

    setCheckoutLink(url);
    await checkUserLicense(boardInfo);
  };

  async function setup() {
    const boardInfo = await miro.board.getInfo();
    const isProMember = await checkUserLicense(boardInfo);
    if (!isProMember) {
      await fetchCheckoutLink(boardInfo);
    }
  }

  React.useEffect(() => {
    setup();
  }, []);

  return (
    <div>
      {checkoutLink && !canAddSticky ? (
        <>
          <p>In order to use this app, you need to have a Pro license.</p>
          <a
            href={checkoutLink}
            target="_blank"
            className="button button-primary"
          >
            Purchase
          </a>
          <hr />
        </>
      ) : null}

      {canAddSticky ? <p>You are an active Pro license holder.</p> : null}

      <div>
        <button
          onClick={addSticky}
          className="button button-primary"
          disabled={!canAddSticky}
        >
          {!canAddSticky ? <span className="icon icon-deactivated" /> : null}
          Add sticky!
        </button>
      </div>
    </div>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
