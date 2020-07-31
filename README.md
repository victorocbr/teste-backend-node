# Teste Back End

API responsável por validar um boleto através de sua linha digitável e respectivamente exibir seus dados.

## Instalação

Use o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar dependências e inicializar API.

```bash
npm install
npm start
```

**Título Bancário**
----
Retorna um JSON referente a um título bancário.

* **URL**

  /tituloBancario/:linhaDigitavel

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `linhaDigitavel=[string]`

* **Success Response:**

  * **Code:** 200

    **Content:** `{"valido":true, "valor":"R$ 1.00", "vencimento":"31/12/2007", "codigoDeBarras":"00193373700000001000500940144816060680935031"}`
 
* **Error Response:**

  * **Code:** 400

    **Content:** `{"erro":"A linha digitável deve possuir 47 dígitos"}`

**Pagamento de Concessionária**
----
Retorna um JSON referente a um pagamento de concessionária.

* **URL**

  /pagamentoConcessonaria/:linhaDigitavel

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `linhaDigitavel=[string]`

* **Success Response:**

  * **Code:** 200

    **Content:** `{"valido":true, "valor":"R$ 411.48", "vencimento":"10/11/2018", "codigoDeBarras":"84680000004114802962018111065900000169820365"}`
 
* **Error Response:**

  * **Code:** 400

    **Content:** `{"erro":"A linha digitável deve possuir 48 dígitos"}`