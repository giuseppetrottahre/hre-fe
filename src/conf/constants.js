let  BACKEND_BASE_API='';//'http://192.168.1.146';
var Constants = {
    LISTA_COMUNI:BACKEND_BASE_API+'/v1/comune',
    LISTA_STATI:BACKEND_BASE_API+'/v1/stato',
    REGISTRAZIONE_UTENTE:BACKEND_BASE_API+'/v1/utente',
    REGISTRAZIONE_CHECK_UTENTE:BACKEND_BASE_API+'/v1/utente/check',
    REGISTRAZIONE_FORNITORI:BACKEND_BASE_API+'/v1/fornitore',
    REGISTRAZIONE_CLIENTI:BACKEND_BASE_API+'/v1/cliente',
    REGISTRAZIONE_ARTISTA:BACKEND_BASE_API+'/v1/artista',
    REGISTRAZIONE_CANDIDATURA:BACKEND_BASE_API+'/v1/candidatura/eventid/userid',
    CANCELLAZIONE_CHECK_UTENTE:BACKEND_BASE_API+'/v1/utente/delete/request/codicefiscale'
  };

  export default Constants ;
