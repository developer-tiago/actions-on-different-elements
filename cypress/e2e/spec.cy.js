describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Tiago", { delay: 0 });
    cy.get("#lastName").type("Paulo", { delay: 0 });
    cy.get("#email").type("tiagopaulo_@hotmail.com", { delay: 0 });
    cy.get("#open-text-area").type("Estou com dúvida ...", { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email").type("tiagopaulo_@hotmail,com", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido  com valor não-numérico", () => {
    cy.get("#phone").type("dsggxcvgsdf").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Tiago", { delay: 0 });
    cy.get("#lastName").type("Paulo", { delay: 0 });
    cy.get("#email").type("tiagopaulo_@hotmail.com", { delay: 0 });
    cy.get("#open-text-area").type("Estou com dúvida ...", { delay: 0 });
    cy.get("#phone-checkbox").check();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Tiago", { delay: 0 })
      .should("have.value", "Tiago")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Paulo", { delay: 0 })
      .should("have.value", "Paulo")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("tiagopaulo_@hotmail.com", { delay: 0 })
      .should("have.value", "tiagopaulo_@hotmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("14999999999", { delay: 0 })
      .should("have.value", "14999999999")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu valor (value)", () => {
    cy.get("select").select("blog").should("have.value", "blog");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("select").select("mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get('input[type="radio"]').check("feedback");
    // cy.get('input[type="radio"][value="feedback"]').check()
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check();
        cy.wrap(radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("input[type='checkbox']")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("input[type='file']")
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
});
