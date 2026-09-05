# Nylon_Den

## Auto-commit al pushear

Este repo tiene un hook `pre-push` que, si hay cambios sin commitear al momento de correr `git push`, los agrega y commitea automaticamente antes de continuar con el push.

Activarlo una vez por clon:

```sh
sh scripts/install-hooks.sh
```

Esto es local a cada clon (Git no permite distribuir hooks activos automaticamente); hay que correr el install una sola vez despues de clonar.
