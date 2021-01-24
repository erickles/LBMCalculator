export default (imc, imcRecord) => {

    return imcRecord.from <= imc && imcRecord.to>= imc;

}