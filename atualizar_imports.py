import os

diretorio = "backend"
antigo = "back_end"
novo = "backend"

def atualizar_imports_em_arquivo(caminho_arquivo):
    with open(caminho_arquivo, "r", encoding="utf-8") as f:
        conteudo = f.read()

    conteudo_atualizado = (
        conteudo.replace(f"from {antigo}.", f"from {novo}.")
                .replace(f"import {antigo}.", f"import {novo}.")
    )

    if conteudo != conteudo_atualizado:
        with open(caminho_arquivo, "w", encoding="utf-8") as f:
            f.write(conteudo_atualizado)
        print(f"✔ Atualizado: {caminho_arquivo}")

def percorrer_e_atualizar(diretorio):
    for raiz, _, arquivos in os.walk(diretorio):
        for nome_arquivo in arquivos:
            if nome_arquivo.endswith(".py"):
                caminho_completo = os.path.join(raiz, nome_arquivo)
                atualizar_imports_em_arquivo(caminho_completo)

if __name__ == "__main__":
    percorrer_e_atualizar(diretorio)
    print("✅ Substituição concluída.")
