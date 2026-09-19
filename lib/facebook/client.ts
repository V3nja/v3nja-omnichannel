/**
 * Meta Graph API Client for Facebook Pages & Messenger Automation
 * Graph API Version: v25.0
 */

const GRAPH_API_BASE = "https://graph.facebook.com/v25.0";

export interface FacebookComment {
  id: string;
  message: string;
  created_time: string;
  from: {
    id: string;
    name: string;
  };
}

export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  attachments?: {
    data: Array<{
      media_type: string;
      url: string;
    }>;
  };
}

/**
 * Send a public reply to a comment on a Facebook Page post/reel
 */
export async function sendPageCommentReply(
  pageAccessToken: string,
  commentId: string,
  message: string
): Promise<{ id: string }> {
  const url = `${GRAPH_API_BASE}/${commentId}/comments`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pageAccessToken}`,
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Failed to send Facebook comment reply");
  }
  return data;
}

/**
 * Send a private reply (Messenger DM) to a Facebook comment
 */
export async function sendPageMessengerPrivateReply(
  pageAccessToken: string,
  commentId: string,
  message: string
): Promise<{ recipient_id: string; message_id: string }> {
  const url = `${GRAPH_API_BASE}/me/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pageAccessToken}`,
    },
    body: JSON.stringify({
      recipient: { comment_id: commentId },
      message: { text: message },
    }),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Failed to send Facebook Messenger private reply");
  }
  return data;
}

/**
 * Send an interactive Generic Template Card with a smart button to Facebook Messenger
 */
export async function sendPageMessengerGenericCard(
  pageAccessToken: string,
  recipientId: string,
  title: string,
  subtitle: string,
  buttonTitle: string,
  buttonUrl: string
): Promise<{ recipient_id: string; message_id: string }> {
  const url = `${GRAPH_API_BASE}/me/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pageAccessToken}`,
    },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [
              {
                title: title.slice(0, 80),
                subtitle: subtitle.slice(0, 80),
                buttons: [
                  {
                    type: "web_url",
                    url: buttonUrl,
                    title: buttonTitle.slice(0, 20),
                  },
                ],
              },
            ],
          },
        },
      },
    }),
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Failed to send Messenger Generic Card");
  }
  return data;
}

/**
 * Publish a new Post or Reel directly to a Facebook Page
 */
export async function publishToFacebookPage(
  pageAccessToken: string,
  pageId: string,
  message: string,
  mediaUrl?: string,
  isVideo: boolean = false
): Promise<{ id: string }> {
  if (isVideo && mediaUrl) {
    // Post as Facebook Video / Reel
    const url = `${GRAPH_API_BASE}/${pageId}/videos`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({
        description: message,
        file_url: mediaUrl,
      }),
    });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error?.message || "FB Video Publish failed");
    return data;
  }

  if (mediaUrl) {
    // Post as Facebook Photo
    const url = `${GRAPH_API_BASE}/${pageId}/photos`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pageAccessToken}`,
      },
      body: JSON.stringify({
        caption: message,
        url: mediaUrl,
      }),
    });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error?.message || "FB Photo Publish failed");
    return data;
  }

  // Text / Link Post
  const url = `${GRAPH_API_BASE}/${pageId}/feed`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pageAccessToken}`,
    },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error?.message || "FB Feed Publish failed");
  return data;
}
