Feature: Creación de un ticket

    Como usuario
    Quiero crear un ticket
    Para tener una mejor trazabilidad sobre las tareas que debo realizar

    Scenario: Crear un ticket con datos válidos
        Given que estoy en el formulario de creación del ticket e ingreso los campos obligatorios
        When confirmo la creacion del ticket
        Then se crea el ticket
