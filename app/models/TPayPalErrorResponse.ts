export type TPaypalErrorResponse = {
  name: string;
  details: {
    issue: string;
    description: string;
  }[];
  message: string;
  debug_id: string;
  links: {
    href: string;
    rel: "information_link" | "redirect";
    method: "GET" | "POST" | "PUT" | "DELETE";
  }[];
};