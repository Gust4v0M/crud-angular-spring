package com.gustavo.enums;

public enum Status {
    ACTIVE("Ativo"), INACTIVE("Inativo");

    private String value;

    private Status(String status){
        this.value = status;
    }

    public String getValue(){
        return value;
    }

    public String geString(){
        return value;
    }
}
