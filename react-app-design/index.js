import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    isLoggedIn: false,
    localhost: "192.168.0.69",
    staticContentURL: "https://csc4330project.s3.amazonaws.com",
    conversations: [],
    searchValue: "",
    user: null,
    allUsers: [],
    bookedSessions: []
})

export { useGlobalState, setGlobalState };