
import { FormEvent, useState, useEffect } from 'react';
import styles from '../../styles/home.module.scss'
import { toast } from 'react-toastify';
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import Router from 'next/router';
import { api } from '../services/apiClient'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';



export default function Dashboard() {

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(false);
    const [totalDocs, setTotalDocs] = useState(0);
    const [currentDocs, setCurrentDocs] = useState(0);
    const [limit, setLimit] = useState(10);

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 300 },
        {
            field: 'name',
            headerName: 'Name',
            width: 300

        },
        {
            field: 'details',
            headerName: 'Details',
            width: 900
        },

    ];


    useEffect(() => {
        getTitle();

    });

    //Para retornar a mensagem geral
    async function getTitle() {
        const response = await api.get('');
        setMessage(response.data.message)
    }

    //Busca a próxima página (quando há)
    async function searchNext() {
        let currentPage = page;
        setPage(currentPage + 1);
        processSearch(currentPage + 1);
    }

    //Busca a página anterior (quando há)
    async function searchPrev() {
        let currentPage = page;
        setPage(currentPage - 1);
        processSearch(currentPage - 1);
    }


    async function handleSearch(event: FormEvent) {
        event.preventDefault();
        setPage(1);
        processSearch(1);
    }

    //Busca customizada (com filtros)
    async function processSearch(page) {
        const responseLaunches = await api.get('launches?search=' + search+'&page='+page);
        setRows(responseLaunches.data.results);
        setNext(responseLaunches.data.hasNext);
        setTotalDocs(responseLaunches.data.totalDocs);
        setCurrentDocs(responseLaunches.data.results.length);
    }

    //Paginação
    function CustomPagination(props: any) {
        return <div style={{color: 'white', textAlign: 'right'}}>
        
        {(limit * (page - 1)) + 1} - {(limit * (page - 1)) + currentDocs} of {totalDocs}
         <br/>
        {page > 1 ?
            <Button
                onClick={() => searchPrev()}
                loading={loading}
            >
                Anterior
            </Button> : null}
        {' '}
        {next ?
            <Button
                onClick={() => searchNext()}
                loading={loading}
            >
                Próximo
            </Button> : null}</div>;
      }

    return (
        <>

            <h2 className={styles.h2} style={{ color: 'white' }}>{message}</h2>


            <div className={styles.containerCenter}>


                <div className={styles.login}>
                    <h1>Faça a sua busca:</h1>
                    <form onSubmit={handleSearch}>
                        <Input
                            placeholder="Digite sua busca"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Buscar
                        </Button>
                    </form>

                    <br /><br />
                    {rows.length > 0 ?
                        <Box sx={{ height: 500, width: 1450 }} >
                            <DataGrid
                            slots={{
                                pagination: CustomPagination,
                              }}
                                sx={{
                                    '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                                        backgroundColor: "white",
                                        color: "",
                                        fontWeight: 700,
                                    }
                                }}
                                
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}


                                disableRowSelectionOnClick
                                
    hideFooterSelectedRowCount


                            />
                            <br />
                            
                        </Box> : null}


                </div>
            </div>
        </>
    )
}