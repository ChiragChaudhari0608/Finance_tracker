import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    overflow: hidden; /* Prevent scrolling */
    height: 100%; /* Ensure the layout takes up the full height */
    display: flex;
    flex-direction: column; /* Ensure the content is stacked vertically */
    gap: 2rem; /* Add spacing between elements */
`;