function useQuery(): URLSearchParams {
    return new URLSearchParams(window.location.search);
}

export default useQuery;
