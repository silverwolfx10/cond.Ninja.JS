/**
 * $cond
 *
 * Retorna uma função que atuara com uma cadeia de responsabilidade, este modulo recebe uma lista
 * de [predicado, transformadora], todos os argumentos sao passado para a funcao predicado e para a funcao
 * transformadora. Se nenhum dos predicados retornar true, a funcao retornara undefined
 *
 * @module $cond
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 *
 *        var fn = $cond([
 *          [$equals(0),   $always('water freezes at 0°C')],
 *          [$equals(100), $always('water boils at 100°C')],
 *          [$t,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
 *        ]);
 *
 *        fn(0); //=> 'water freezes at 0°C'
 *
 */
this.Ninja.module('$cond', ['$apply', '$iterator'], function ($apply, $iterator) {

  /**
   * Retorna uma função que atuara com uma cadeia de responsabilidade, este modulo recebe uma lista
   * de [predicado, transformadora], todos os argumentos sao passado para a funcao predicado e para a funcao
   * transformadora. Se nenhum dos predicados retornar true, a funcao retornara undefined
   *
   * @public
   * @method cond
   * @param {Array} pairs Lista de pares de predicado e transformadora
   * @return {Function} Funcao que executa a cadeia de responsabilidade
   * @example
   *
   *        var fn = $cond([
   *          [$equals(0),   $always('water freezes at 0°C')],
   *          [$equals(100), $always('water boils at 100°C')],
   *          [$t,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
   *        ]);
   *
   *        fn(0); //=> 'water freezes at 0°C'
   *
   */
  function cond(pairs) {

    /**
     * Funcao que executa a cadeia de responsabilidade
     */
    return function () {
      for (var i = $iterator(pairs); i.hasNext();) {
        if ($apply(i.next()[0], arguments)) return $apply(i.current()[1], arguments);
      }
    };

  }

  /**
   * Revelacao do servico $cond, encapsulando a visibilidade das funcoes
   * privadas
   */
  return cond;

});