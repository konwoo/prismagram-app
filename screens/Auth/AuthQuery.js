import { gql } from "apollo-boost";

export const LOG_IN = gql`
    query requestSecret($email: String!) {
        requestSecret(email: $email)
    }
`;